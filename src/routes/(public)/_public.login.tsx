import { createFileRoute, Link } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";

import {
  loginSchema,
  LoginSchemaType,
} from "@/features/auth/schemas/login-schema";
import { useLogin } from "@/features/auth/hooks/use-login";
import { Loader } from "lucide-react";

export const Route = createFileRoute("/(public)/_public/login")({
  component: LoginPage,
});

function LoginPage() {
  const { mutate: loginUser, isPending } = useLogin();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchemaType) {
    console.log(values);
    loginUser(values);
  }

  return (
    <Card className="w-100">
      <CardHeader>
        <CardTitle className="text-2xl">Log in to your account</CardTitle>
        <CardDescription>Fill in your username and password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
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
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  {/* <FormDescription>Login here.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-20">
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-sm">
        <p className="text-muted-foreground">Don't have an account?</p>
        <Link to={"/register"} className="text-blue-500 underline px-2">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
