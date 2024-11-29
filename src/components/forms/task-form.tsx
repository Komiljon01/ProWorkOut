import { taskSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useUserState } from "@/stores/user.store";
import { toast } from "sonner";
import FillLoading from "../shared/fill-loading";

interface Props {
  title?: string;
  isEdit?: boolean;
  onClose?: () => void;
  handler: (values: z.infer<typeof taskSchema>) => Promise<void | null>;
}

function TaskForm({ title = "", handler }: Props) {
  const [loading, setLoading] = useState(false);
  const { user } = useUserState();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title },
  });

  const onSubmit = async (values: z.infer<typeof taskSchema>) => {
    if (!user) return null;
    setLoading(true);
    const promise = handler(values).finally(() => setLoading(false));

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfull",
      error: "Something went wrong",
    });
  };

  return (
    <>
      {loading && <FillLoading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter a task"
                    type="text"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default TaskForm;
