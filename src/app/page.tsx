import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to BlogHub</h1>
      <p className="text-xl mb-8">
        Share your stories, ideas, and insights with the world.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/create">Start Writing</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blogs">Explore Blogs</Link>
        </Button>
      </div>
    </div>
  );
}
