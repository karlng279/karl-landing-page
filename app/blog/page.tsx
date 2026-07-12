import type { Metadata } from "next";
import Header from "@/components/Header";
import BlogClientPage from "./BlogClientPage";
import StartHere from "@/components/StartHere";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Karl Nguyen",
  description:
    "Thoughts on container shipping, logistics technology, and AI adoption in operations.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Karl Nguyen",
    description:
      "Thoughts on container shipping, logistics technology, and AI adoption in operations.",
    type: "website",
    url: "https://karl-nguyen.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <Header />
      <BlogClientPage posts={posts} startHere={<StartHere posts={posts} />} />
    </>
  );
}
