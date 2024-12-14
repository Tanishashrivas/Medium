import { prisma } from "@/app/utils/prisma-client";
import { BadRequestError, Ok, ValidationError } from "@/app/utils/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

const secret = process.env.JWT_SECRET;

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return BadRequestError("Required fields are missing")({});
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return BadRequestError("User doesn't exist")({});
  }

  const valid = await bcrypt.compare(password, user.password || "");

  if (!valid) {
    return ValidationError("Invalid password")({});
  }

  const token = await jwt.sign({ id: user.id }, secret!, {
    expiresIn: "2h",
  }); //non-null assertion (!) that suggests that the variable is defined, it bypasses TypeScript's type safety.

  return Ok("User signed in successfully")({
    user: user,
    token: token,
  });
}

//In NextRequest, we can't do req.body because it comes as a readable stream which needs to be parsed first(req.json())
