"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchBlogs } from "./hooks/getBlogs";

export function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState([]);
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
      readTime: "5 min read",
      likes: 142,
      comments: 28,
    },
    {
      id: 2,
      title: "The Future of AI Development",
      excerpt:
        "Exploring the latest trends in artificial intelligence and what it means for developers. From machine learning to neural networks, we dive deep into the technologies shaping our future.",
      author: {
        name: "Alex Chen",
        avatar: "/placeholder.svg",
        description: "AI Researcher and Tech Enthusiast",
      },
      date: "Dec 15, 2023",
      readTime: "8 min read",
      likes: 89,
      comments: 15,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlogs();

      if (data) {
        setBlogPosts(data);
      }
    };

    fetchData();
  }, []);

  console.log(blogPosts);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <div className="space-x-2">
          <Button variant="outline" className="text-sm">
            For you
          </Button>
          <Button variant="outline" className="text-sm">
            Following
          </Button>
        </div>
      </div>
      <div className="grid gap-8 xl:grid-cols-2">
        {blogs.map((blog) => (
          <Card key={blog.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={blog.author.avatar}
                    alt={blog.author.name}
                  />
                  <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{blog.author.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {blog.author.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href={`/blog/${blog.id}`} className="group">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {/* {blog.title} */}
                </h2>
              </Link>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {blog.excerpt}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>{blog.date}</span>
                <span>{blog.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary"
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                </Button>
                <span>{blog.likes}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="sr-only">Comment</span>
                </Button>
                <span>{blog.comments}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
