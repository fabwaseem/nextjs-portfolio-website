import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogContent } from "@/components/portfolio/blog-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: {
      slug,
      status: "PUBLISHED",
      deletedAt: null,
    },
    select: {
      title: true,
      metaTitle: true,
      metaDescription: true,
      excerpt: true,
      featuredImage: true,
      featuredImageAlt: true,
      seoKeywords: true,
      publishedAt: true,
      updatedAt: true,
      readingTime: true,
      wordCount: true,
      categories: {
        select: {
          title: true,
          slug: true,
        },
      },
      tags: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
  });

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const title = blog.metaTitle || blog.title;
  const description =
    blog.metaDescription ||
    blog.excerpt ||
    `${blog.title} - A blog post by Waseem Anjum`;
  const image = blog.featuredImage;
  const keywords = [
    ...(blog.seoKeywords || []),
    ...blog.categories.map((cat) => cat.title),
    ...blog.tags.map((tag) => tag.title),
    "web3",
    "dapp",
    "full stack",
    "developer",
    "blog",
    "tutorial",
  ];

  const publishedTime = blog.publishedAt
    ? new Date(blog.publishedAt).toISOString()
    : undefined;
  const modifiedTime = blog.updatedAt
    ? new Date(blog.updatedAt).toISOString()
    : undefined;

  const authors = [{ name: "Waseem Anjum", url: "https://waseem.dev" }];

  return {
    title,
    description,
    keywords,
    authors,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: authors.map((a) => a.name),
      images: image
        ? [
            {
              url: image,
              alt: blog.featuredImageAlt || blog.title,
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
      creator: "@waseemdev",
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
    other: {
      "article:published_time": publishedTime || "",
      "article:modified_time": modifiedTime || "",
      "article:author": authors[0].name,
      "article:section": blog.categories[0]?.title || "Technology",
      ...(blog.readingTime && { "article:reading_time": blog.readingTime.toString() }),
    },
  };
}

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
    },
    select: {
      slug: true,
    },
  });

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: {
      slug,
      status: "PUBLISHED",
      deletedAt: null,
    },
    include: {
      categories: true,
      tags: true,
      relatedTo: {
        where: {
          status: "PUBLISHED",
          deletedAt: null,
        },
        include: {
          categories: true,
          tags: true,
        },
        take: 3,
      },
    },
  });

  if (!blog) {
    notFound();
  }

  return <BlogContent blog={blog} />;
}
