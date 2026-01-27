import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectContent } from "@/components/layouts/vscode/project/project-content";
import { BASE_URL } from "@/config/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: {
      slug,
      status: "PUBLISHED",
      deletedAt: null,
    },
    select: {
      title: true,
      metaTitle: true,
      metaDescription: true,
      description: true,
      excerpt: true,
      cover: true,
      thumbnail: true,
      seoKeywords: true,
      publishedAt: true,
      updatedAt: true,
      tags: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = project.metaTitle || project.title;
  const description =
    project.metaDescription ||
    project.excerpt ||
    project.description ||
    `${project.title} - A project by Waseem Anjum`;
  const image = project.cover || project.thumbnail;
  const keywords = [
    ...(project.seoKeywords || []),
    ...project.tags.map((tag) => tag.title),
    "web3",
    "dapp",
    "full stack",
    "developer",
    "portfolio",
  ];

  const publishedTime = project.publishedAt
    ? new Date(project.publishedAt).toISOString()
    : undefined;
  const modifiedTime = project.updatedAt
    ? new Date(project.updatedAt).toISOString()
    : undefined;

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Waseem Anjum" }],
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      modifiedTime,
      images: image
        ? [
            {
              url: image,
              alt: project.title,
            },
          ]
        : [],
      siteName: "Waseem Anjum - Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: `${BASE_URL}/projects/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
    },
    select: {
      slug: true,
    },
  });

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: {
      slug,
      status: "PUBLISHED",
      deletedAt: null,
    },
    include: {
      tags: true,
    },
  });

  if (!project) {
    notFound();
  }

  // Serialize dates to ISO strings for client component compatibility
  const serializedProject = {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    publishedAt: project.publishedAt?.toISOString() ?? null,
    deletedAt: project.deletedAt?.toISOString() ?? null,
  };

  // Generate CreativeWork schema for project
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.metaDescription || project.excerpt || project.description || project.title,
    image: project.cover || project.thumbnail
      ? [
          {
            "@type": "ImageObject",
            url: project.cover || project.thumbnail,
            alt: project.title,
          },
        ]
      : undefined,
    dateCreated: project.publishedAt?.toISOString() || project.createdAt.toISOString(),
    dateModified: project.updatedAt.toISOString(),
    creator: {
      "@type": "Person",
      name: "Waseem Anjum",
      url: BASE_URL,
    },
    url: `${BASE_URL}/projects/${slug}`,
    keywords: [
      ...(project.seoKeywords || []),
      ...project.tags.map((tag) => tag.title),
    ].join(", "),
    ...(project.demoLink && {
      mainEntity: {
        "@type": "WebApplication",
        url: project.demoLink,
      },
    }),
    ...(project.githubLink && {
      codeRepository: project.githubLink,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <ProjectContent project={serializedProject} />
    </>
  );
}
