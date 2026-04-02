import Link from "next/link";
import Image from "next/image";
import { Container } from "../ui/Container";
import { sanityFetch, urlFor } from "@/lib/sanity";
import type { PostCard } from "@/lib/types";
import { ArrowRight } from "lucide-react";

const recentPostsQuery = `*[_type == "post"] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  "categories": categories[]->{title, slug}
}`;

function formatDate(dateString?: string) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function FeaturedBlog() {
  const posts = await sanityFetch<PostCard[]>(recentPostsQuery);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-gray-300 tracking-wider">[07]</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-[0.15em]">Blog</span>
            </div>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#0a0a0a] tracking-[-0.02em]">
              Latest from Yander
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a] hover:text-gray-600 transition-colors"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="bg-white p-0 group"
            >
              {/* Image */}
              {post.mainImage && (
                <div className="aspect-[16/9] overflow-hidden bg-[#fafafa]">
                  <Image
                    src={urlFor(post.mainImage).width(600).height(338).url()}
                    alt={post.mainImage.alt || post.title}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Category + Date */}
                <div className="flex items-center gap-3 mb-3">
                  {post.categories?.[0] && (
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {post.categories[0].title}
                    </span>
                  )}
                  {post.categories?.[0] && post.publishedAt && (
                    <span className="text-gray-200">·</span>
                  )}
                  {post.publishedAt && (
                    <span className="text-xs text-gray-400">
                      {formatDate(post.publishedAt)}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-[#0a0a0a] group-hover:text-gray-600 transition-colors leading-snug">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-[#0a0a0a] group-hover:text-gray-600 transition-colors">
                  Read more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a]"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
