"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function CreateBlogPage() {
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Draft in Kinga</h1>
        <Button>Publish</Button>
      </div>
      <div className="space-y-4">
        <Input
          className="text-4xl font-bold border-none px-0 focus-visible:ring-0"
          placeholder="Title"
        />
        <textarea
          className="w-full h-64 text-lg border-none resize-none focus:outline-none"
          placeholder="Tell your story..."
        ></textarea>
      </div>
    </div>
  );
}
