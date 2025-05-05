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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import {
  registerSchema,
  RegisterSchemaType,
} from "@/features/auth/schemas/register-schema";
import { useRegister } from "@/features/auth/hooks/use-register";
import { Loader } from "lucide-react";

export const Route = createFileRoute("/(public)/_public/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const { mutate: createUser, isPending } = useRegister();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: RegisterSchemaType) {
    console.log(values);
    createUser(values);
  }

  return (
    <Card className="w-100">
      <CardHeader>
        <CardTitle className="text-2xl">Register an account</CardTitle>
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
                    <Input placeholder="at least 5 characters..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                    <Input
                      type="password"
                      placeholder="at least 8 characters..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please include upper, lower, number, and special characters.
                  </FormDescription>
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
        <p className="text-muted-foreground">Already have an account?</p>
        <Link to={"/login"} className="text-blue-500 underline px-2">
          Log in
        </Link>
      </CardFooter>
    </Card>
  );
}
