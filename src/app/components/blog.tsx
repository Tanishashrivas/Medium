"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function BlogsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/signin");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const blogs = [
    {
      id: 1,
      title: "Taxing Laughter: The Joke Tax Chronicles",
      excerpt:
        "Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.",
      author: {
        name: "Jokester",
        avatar: "/placeholder.svg",
        description: "Historian of all things funny and witty",
      },
      date: "August 24, 2023",
    },
    {
      id: 2,
      title: "The Future of AI Development",
      excerpt:
        "Exploring the latest trends in artificial intelligence and what it means for developers.",
      author: {
        name: "Alex Chen",
        avatar: "/placeholder.svg",
        role: "AI Researcher",
      },
      date: "Dec 15, 2023",
      readTime: "5 min read",
    },
    // Add more blog posts as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <div>
          <Button variant="outline" className="mr-2">
            For you
          </Button>
          <Button variant="outline">Following</Button>
        </div>
      </div>
      <div className="space-y-8">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="border-b pb-8 bg-gray-800 border-gray-700 hover:border-purple-500 transition-all"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={blog.author.avatar}
                alt={blog.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-white">{blog.author.name}</h3>
                <p className="text-sm text-gray-400">
                  {blog.author.description || blog.author.role}
                </p>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2 text-white">{blog.title}</h2>
            <p className="text-gray-300 mb-4">{blog.excerpt}</p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>{blog.date}</span>
              <div className="space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
