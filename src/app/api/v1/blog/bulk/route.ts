import { prisma } from "@/app/utils/prisma-client";
import { BadRequestError, Ok } from "@/app/utils/response";

export async function GET() {
  try {
    const blogs = await prisma.post.findMany();

    if (!blogs) {
      return BadRequestError("No blogs found")({});
    }

    return Ok("Blogs fetched successfully")({ posts: blogs });
  } catch (error) {
    return BadRequestError("Error in fetching blogs")({ error: error });
  }
}
