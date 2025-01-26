"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IBlogProps {
  title: string;
  content: string;
  published: boolean;
}

export function CreateBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [blogContent, setBlogContent] = useState<IBlogProps>({
    title: "",
    content: "",
    published: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBlogContent((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "/api/v1/blog",
      {
        ...blogContent,
        published: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("blog response", response.data.data);
  };

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Draft in Kinga</h1>
        <Button onClick={handlePublish}>Publish</Button>
      </div>
      <div className="space-y-4">
        <Input
          className="text-4xl font-bold border-none px-0 focus-visible:ring-0"
          placeholder="Title"
          name="title"
          value={blogContent.title}
          onChange={(e) => handleChange(e)}
        />
        <textarea
          className="w-full h-64 text-lg border-none resize-none focus:outline-none"
          placeholder="Tell your story..."
          name="content"
          value={blogContent.content}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>
    </div>
  );
}
