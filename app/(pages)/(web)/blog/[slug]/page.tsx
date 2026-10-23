import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getPublishedBlogSlugs,
} from "@/lib/data/static-content";
import { BlogContent } from "@/components/layouts/vscode/blog/blog-content";
import { BASE_URL } from "@/config/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const blog = getBlogPostBySlug(slug);

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
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    other: {
      "article:published_time": publishedTime || "",
      "article:modified_time": modifiedTime || "",
      "article:author": authors[0].name,
      "article:section": blog.categories[0]?.title || "Technology",
      ...(blog.readingTime && {
        "article:reading_time": blog.readingTime.toString(),
      }),
    },
  };
}

export async function generateStaticParams() {
  return getPublishedBlogSlugs().map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = getBlogPostBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Serialize dates to ISO strings for client component compatibility
  const serializedBlog = {
    ...blog,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
    publishedAt: blog.publishedAt?.toISOString() ?? null,
    deletedAt: blog.deletedAt?.toISOString() ?? null,
    relatedTo: blog.relatedTo.map((related) => ({
      ...related,
      createdAt: related.createdAt.toISOString(),
      updatedAt: related.updatedAt.toISOString(),
      publishedAt: related.publishedAt?.toISOString() ?? null,
      deletedAt: related.deletedAt?.toISOString() ?? null,
    })),
  };

  // Generate BlogPosting schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt || blog.title,
    image: blog.featuredImage
      ? [
          {
            "@type": "ImageObject",
            url: blog.featuredImage,
            alt: blog.featuredImageAlt || blog.title,
          },
        ]
      : undefined,
    datePublished: blog.publishedAt?.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: "Waseem Anjum",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Waseem Anjum",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
    articleSection: blog.categories[0]?.title || "Technology",
    keywords: [
      ...(blog.seoKeywords || []),
      ...blog.categories.map((cat) => cat.title),
      ...blog.tags.map((tag) => tag.title),
    ].join(", "),
    ...(blog.readingTime && {
      timeRequired: `PT${blog.readingTime}M`,
    }),
    ...(blog.wordCount && {
      wordCount: blog.wordCount,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogContent blog={serializedBlog} />
    </>
  );
}
