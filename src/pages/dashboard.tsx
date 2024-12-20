// Components
import TaskItem from "@/components/shared/task-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FillLoading from "@/components/shared/fill-loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import TaskForm from "@/components/forms/task-form";

// Icons
import { AlertCircle, BadgePlus } from "lucide-react";

// Firebase
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

// React
import { useState } from "react";

import { z } from "zod";
import { taskSchema } from "@/lib/validation";
import { useUserState } from "@/stores/user.store";
import { useQuery } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import { iTask } from "@/types";
import { toast } from "sonner";
import { addMilliseconds, addMinutes, format } from "date-fns";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState<iTask | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useUserState();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["tasks-data"],
    queryFn: taskService.getTasks,
  });

  const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
    if (!user) return null;

    return addDoc(collection(db, "tasks"), {
      title,
      status: "unstarted",
      startTime: null,
      endTime: null,
      userId: user?.uid,
    })
      .then(() => refetch())
      .finally(() => setOpen(false));
  };

  const onUpdateTask = async ({ title }: z.infer<typeof taskSchema>) => {
    if (!user) return null;
    if (!currentTask) return null;
    const ref = doc(db, "tasks", currentTask.id);

    return updateDoc(ref, { title })
      .then(() => refetch())
      .finally(() => setIsEditing(false));
  };

  const onStartEditing = (task: iTask) => {
    setIsEditing(true);
    setCurrentTask(task);
  };

  const onDelete = async (id: string) => {
    setIsDeleting(true);
    const promise = deleteDoc(doc(db, "tasks", id))
      .then(() => refetch())
      .finally(() => setIsDeleting(false));

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfully deleted!",
      error: "Something went wrong!",
    });
  };

  const formatDate = (time: number) => {
    const date = addMilliseconds(new Date(0), time);
    const formattedDate = format(
      addMinutes(date, date.getTimezoneOffset()),
      "HH:mm:ss",
    );
    return formattedDate;
  };

  return (
    <>
      <div className="mx-auto flex h-screen max-w-6xl items-center pt-52 max-xl:px-6 lg:pt-0">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col space-y-3">
            <div className="flex w-full justify-between rounded-md bg-gradient-to-t from-background to-secondary p-4">
              <h2 className="text-2xl font-bold">Trainings</h2>
              <Button size={"icon"} onClick={() => setOpen(true)}>
                <BadgePlus />
              </Button>
            </div>
            <Separator />
            <div className="relative flex min-h-60 w-full justify-between rounded-md bg-gradient-to-b from-background to-secondary p-4">
              {(isPending || isDeleting) && <FillLoading />}
              {error && (
                <Alert variant="destructive" className="mb-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              )}

              {data && (
                <div className="flex w-full flex-col space-y-3">
                  {!isEditing &&
                    data.tasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onStartEditing={() => onStartEditing(task)}
                        onDelete={() => onDelete(task.id)}
                        refetch={refetch}
                      />
                    ))}

                  {isEditing && (
                    <TaskForm
                      title={currentTask?.title}
                      isEdit
                      onClose={() => setIsEditing(false)}
                      handler={
                        onUpdateTask as (
                          values: z.infer<typeof taskSchema>,
                        ) => Promise<void | null>
                      }
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="relative flex w-full flex-col space-y-3">
            <div className="relative h-24 rounded-md bg-gradient-to-r from-blue-900 to-background p-4">
              <h3 className="text-2xl font-bold">Total week</h3>
              {isPending ? (
                <FillLoading />
              ) : (
                data && (
                  <h2 className="text-3xl font-bold">
                    {formatDate(data.weekTotal)}
                  </h2>
                )
              )}
            </div>
            <div className="relative h-24 rounded-md bg-gradient-to-r from-secondary to-background p-4">
              <h3 className="text-2xl font-bold">Total month</h3>
              {isPending ? (
                <FillLoading />
              ) : (
                data && (
                  <h2 className="text-3xl font-bold">
                    {formatDate(data.monthTotal)}
                  </h2>
                )
              )}
            </div>
            <div className="relative h-24 rounded-md bg-gradient-to-r from-destructive to-background p-4">
              <h3 className="text-2xl font-bold">Total time</h3>
              {isPending ? (
                <FillLoading />
              ) : (
                data && (
                  <h2 className="text-3xl font-bold">
                    {formatDate(data.total)}
                  </h2>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new task</DialogTitle>
          </DialogHeader>
          <Separator />
          <TaskForm
            handler={
              onAdd as (
                values: z.infer<typeof taskSchema>,
              ) => Promise<void | null>
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Dashboard;
