"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartHandshake, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least of 6 characters.",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        username : values.username,
        password: values.password,
        redirect : false
      });
      if (res?.ok) {
        toast.success("Successfully Signed In!");
        router.push("/home");
        return;
      } else {
        toast.error("Error while signing in!")
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[450px] shadow-2xl p-4">
        <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2 text-pink-600">
          <HeartHandshake className="h-8 w-8 text-pink-500" />
          MatchMe
        </CardTitle>
        <CardDescription>
          <span className="text-lg text-center flex justify-center items-center font-serif text-gray-600 my-2">
            Welcome back to MatchMe!
          </span>
        </CardDescription>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button
                    type="submit"
                    disabled={isLoading}
                      className={`${isLoading ? 'bg-opacity-50 text-black'  : 'bg-pink-500 hover:bg-pink-600 text-white'}`}
                
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-1.5">
                      <span className="">Submitting...</span>
                      <Loader2Icon className="animate-spin" />
                      </div>
                    ) : (
                      <>
                        Login
                      </>
                    )}
                  </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Dont&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-pink-600 hover:underline transition-all duration-300 ease-in-out"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
