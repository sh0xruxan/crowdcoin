"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/navbar"
import { useFormState, useFormStatus } from "react-dom"
import { signIn, type FormState } from "@/lib/actions"
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
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  )
}

const initialState: FormState = {}

export default function SignInPage() {
  const [state, formAction] = useFormState(signIn, initialState)
  const router = useRouter()

  // Redirect on successful signin
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
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
          </div>

          {state.success ? (
            <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Signed in successfully! Redirecting you to the homepage...</AlertDescription>
            </Alert>
          ) : (
            <form action={formAction} className="space-y-4">
              {state.errors?._form ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{state.errors._form[0]}</AlertDescription>
                </Alert>
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="m@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" />
              </div>
              <SubmitButton />
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} ZettaByte. All rights reserved.</p>
      </footer>
    </main>
  )
}
