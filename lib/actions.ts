"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// User schema for validation
const userSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})

// Type for form state
export type FormState = {
  errors?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    password?: string[]
    terms?: string[]
    _form?: string[]
  }
  message?: string
  success?: boolean
}

// Mock database of users (in a real app, this would be a database)
const mockUsers = new Map<string, any>()

// Sign up action
export async function signUp(prevState: FormState, formData: FormData): Promise<FormState> {
  // Validate form data
  const validatedFields = userSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    terms: formData.get("terms") === "on",
  })

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors above.",
      success: false,
    }
  }

  const { firstName, lastName, email, password } = validatedFields.data

  try {
    // Check if user already exists
    if (mockUsers.has(email)) {
      return {
        errors: {
          _form: ["A user with this email already exists."],
        },
        success: false,
      }
    }

    // In a real app, you would hash the password before storing it
    // For demo purposes, we'll just store the user data in our mock database
    mockUsers.set(email, {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password, // In a real app, this would be hashed
      createdAt: new Date(),
    })

    // Set a cookie to simulate authentication
    cookies().set("user_email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Return success
    return {
      message: "Account created successfully!",
      success: true,
    }
  } catch (error) {
    // Handle any errors
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
      success: false,
    }
  }
}

// Sign in action
export async function signIn(prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate email and password
  if (!email || !password) {
    return {
      errors: {
        _form: ["Please provide both email and password."],
      },
      success: false,
    }
  }

  try {
    // Check if user exists and password matches
    const user = mockUsers.get(email)

    if (!user || user.password !== password) {
      return {
        errors: {
          _form: ["Invalid email or password."],
        },
        success: false,
      }
    }

    // Set a cookie to simulate authentication
    cookies().set("user_email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Return success
    return {
      message: "Signed in successfully!",
      success: true,
    }
  } catch (error) {
    // Handle any errors
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
      success: false,
    }
  }
}

// Sign out action
export async function signOut() {
  cookies().delete("user_email")
  redirect("/")
}

// Get current user
export async function getCurrentUser() {
  const email = cookies().get("user_email")?.value

  if (!email) {
    return null
  }

  const user = mockUsers.get(email)

  if (!user) {
    return null
  }

  // Don't return the password
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}
