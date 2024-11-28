import { useAuthState } from "@/stores/auth.store";

// Components
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

function Login() {
  const { setAuth } = useAuthState();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;
    console.log(email, password);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">Login</h2>
      <p className="text-muted-foreground">
        Don't have an account?{" "}
        <span
          className="cursor-pointer text-blue-500 hover:underline"
          onClick={() => setAuth("register")}
        >
          Sign up
        </span>
      </p>
      <Separator className="my-5" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    type="email"
                    {...field}
                  />
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
                  <Input placeholder="*****" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" className="mt-2 h-12 w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Login;
