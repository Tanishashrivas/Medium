import { NextRequest } from "next/server";
import { prisma } from "@/app/utils/prisma-client";
import { BadRequestError, Ok } from "@/app/utils/response";
import { IBlogPost } from "../route";

export async function GET(request: NextRequest) {
  const pathname = request.url;
  const blogId = pathname.split("/").pop();
  console.log("blog id", blogId);

  try {
    const blog = await prisma.post.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return BadRequestError(`No blog found with the blog id: ${blogId}`)({});
    }

    return Ok("Blog fetched successfully")({ post: blog });
  } catch (error) {
    return BadRequestError("Error in updating blog")({ error: error });
  }
}

export async function PATCH(request: NextRequest) {
  const pathname = request.url;
  const blogId = pathname.split("/").pop();
  const { title, content, published }: Partial<IBlogPost> =
    await request.json();

  try {
    const blog = await prisma.post.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return BadRequestError(`No blog found with the blog id: ${blogId}`)({});
    }

    const updatedBlog = await prisma.post.update({
      where: {
        id: blogId,
      },
      data: {
        title: title || blog.title,
        content: content || blog.content,
        published: published || blog.published,
        authorId: blog.authorId,
      },
    });

    return Ok("Blog updated successfully")({ post: updatedBlog });
  } catch (error) {
    return BadRequestError("Error in updating blog")({ error: error });
  }
}
