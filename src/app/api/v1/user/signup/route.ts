import { prisma } from "@/app/utils/prisma-client";
import { BadRequestError, Ok } from "@/app/utils/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

const secret = process.env.JWT_SECRET;

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json();

  if (!email || !password) {
    return BadRequestError("Required fields are missing")({});
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name ?? "",
    },
  });

  const token = await jwt.sign({ id: user.id }, secret!, {
    expiresIn: "1h",
  }); //non-null assertion (!) that suggests that the variable is defined, it bypasses TypeScript's type safety.

  return Ok("User signed up successfully")({
    user: user,
    token: token,
  });
}

//In NextRequest, we can't do req.body because it comes as a readable stream which needs to be parsed first(req.json())
