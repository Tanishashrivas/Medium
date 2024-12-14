"use client";

//let's make this as normal form and signin one as a react form
import React, { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(4, "Name must contain atleast of 4 characters")
    .max(50, "Character limit exceeded"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must contain atleast 8 characters"),
  // confirmPassword: z.string().refine((value:, ctx) => value === ctx.parent.password, {
  //   message: "Passwords do not match",
  // }),
});

export function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);
    const fieldErrors: { [key: string]: string } = {};

    if (!result.success) {
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("form data", formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen flex justify-center items-center"
    >
      <div className="justify-center flex-col min-w-[24rem] max-w-[28rem] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div>
          <label className="block mb-2 text-sm text-black font-semibold pt-4">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}> {errors.name} </p>}
        </div>
        <div>
          <label className="block mb-2 text-sm text-black font-semibold pt-4">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}> {errors.email} </p>}
        </div>
        <div>
          <label className="block mb-2 text-sm text-black font-semibold pt-4">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p style={{ color: "red" }}> {errors.password} </p>
          )}
        </div>
        {/* <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}> {errors.confirmPassword} </p>
        )}
      </div> */}
        <button
          type="submit"
          className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {" "}
          Sign Up{" "}
        </button>
      </div>
    </form>
  );
}
