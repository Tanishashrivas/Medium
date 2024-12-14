import { prisma } from "@/app/utils/prisma-client";
import { BadRequestError, Ok } from "@/app/utils/response";
import { NextRequest } from "next/server";

export interface IBlogPost {
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export async function POST(request: NextRequest) {
  const userId: string | null = request.headers.get("userid");
  const { title, content, published }: IBlogPost = await request.json();

  try {
    if (!userId) {
      return BadRequestError("User id is required")({});
    }

    const blog = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId: userId,
      },
    });

    return Ok("Blog created successfully")({ post: blog });
  } catch (error) {
    return BadRequestError("Error in creating blog")({ error: error });
  }
}
