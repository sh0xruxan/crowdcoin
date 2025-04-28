"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/navbar"
import { useFormState, useFormStatus } from "react-dom"
import { signUp, type FormState } from "@/lib/actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating account...
        </>
      ) : (
        "Sign Up"
      )}
    </Button>
  )
}

const initialState: FormState = {}

export default function SignUpPage() {
  const [state, formAction] = useFormState(signUp, initialState)
  const router = useRouter()

  // Redirect on successful signup
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [state.success, router])

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-500 dark:text-gray-400">Create an account to start funding projects</p>
          </div>

          {state.success ? (
            <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Account created successfully! Redirecting you to the homepage...</AlertDescription>
            </Alert>
          ) : (
            <form action={formAction} className="space-y-4">
              {state.errors?._form ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{state.errors._form[0]}</AlertDescription>
                </Alert>
              ) : null}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" name="firstName" placeholder="John" />
                  {state.errors?.firstName ? <p className="text-sm text-red-500">{state.errors.firstName[0]}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" name="lastName" placeholder="Doe" />
                  {state.errors?.lastName ? <p className="text-sm text-red-500">{state.errors.lastName[0]}</p> : null}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" />
                {state.errors?.email ? <p className="text-sm text-red-500">{state.errors.email[0]}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" />
                {state.errors?.password ? <p className="text-sm text-red-500">{state.errors.password[0]}</p> : null}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" name="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="underline">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline">
                    privacy policy
                  </Link>
                </label>
              </div>
              {state.errors?.terms ? <p className="text-sm text-red-500">{state.errors.terms[0]}</p> : null}
              <SubmitButton />
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/signin" className="underline">
                  Sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} BlockFund. All rights reserved.</p>
      </footer>
    </main>
  )
}
