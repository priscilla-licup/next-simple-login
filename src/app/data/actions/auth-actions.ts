"use server";
import { z } from "zod"

import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { redirect } from "next/navigation";


const schemaRegister = z.object({
    username: z.string().min(3).max(20, {
      message: "Username must be between 3 and 20 characters",
    }),
    password: z.string().min(6).max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
  });

  connect()  // Calls the connect function to establish a connection to the database.

export async function registerUserAction(prevState: any, formData: FormData) {
  console.log("Hello From Register User Action");

  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  //Checks if a user with the provided email already exists. 
  const email = validatedFields.data?.email
  const user = await User.findOne({email})

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  } 
    

  // return{
  //   ...prevState,
  //   data: "ok",
  // }

  // If successful, redirect to another page
  redirect("/signin");
}