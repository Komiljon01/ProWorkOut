import { Card } from "../ui/card";
import { MdOutlineTask } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { Button } from "../ui/button";
import { Edit2, Trash } from "lucide-react";
import { iTask, iTaskData } from "@/types";
import { RxReload } from "react-icons/rx";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { QueryObserverResult } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import FillLoading from "./fill-loading";
import { cn } from "@/lib/utils";

interface Props {
  task: iTask;
  onStartEditing: () => void;
  onDelete: () => void;
  refetch: () => Promise<QueryObserverResult<iTaskData, Error>>;
}

function TaskItem({ task, onStartEditing, onDelete, refetch }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { title, status, id, startTime, totalTime } = task;

  const activeColor = useMemo(() => {
    switch (status) {
      case "unstarted":
        return "text-indigo-500";
      case "in_progress":
        return "text-green-500";
      case "paused":
        return "text-red-500";
    }
  }, [status]);

  const onStart = async () => {
    setIsLoading(true);
    const ref = doc(db, "tasks", id);

    try {
      await updateDoc(ref, { status: "in_progress", startTime: Date.now() });
      refetch();
    } catch (err) {
      const result = err as Error;
      toast.error(result.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onPause = async () => {
    setIsLoading(true);
    const ref = doc(db, "tasks", id);

    try {
      const elapsed = startTime ? Date.now() - startTime : 0;
      const newTotalTime = (totalTime || 0) + elapsed;

      await updateDoc(ref, {
        status: "paused",
        endTime: Date.now(),
        totalTime: newTotalTime,
      });
      refetch();
    } catch (err) {
      const result = err as Error;
      toast.error(result.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBtns = () => {
    switch (status) {
      case "unstarted":
        return (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-8 w-8"
            onClick={onStart}
          >
            <CiPlay1 className="h-5 w-5 text-indigo-500" />
          </Button>
        );
      case "in_progress":
        return (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-8 w-8"
            onClick={onPause}
          >
            <CiPause1 className="h-5 w-5 text-indigo-500" />
          </Button>
        );
      case "paused":
        return (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-8 w-8"
            onClick={onStart}
          >
            <RxReload className="h-5 w-5 text-indigo-500" />
          </Button>
        );
    }
  };

  return (
    <Card className="relative grid w-full grid-cols-4 items-center p-4 shadow-md">
      {isLoading && <FillLoading />}
      <div className="col-span-2 flex items-center gap-1">
        <MdOutlineTask className="text-blue-500" />
        <span className="capitalize">{title}</span>
      </div>
      <div className="flex items-center gap-1">
        <HiStatusOnline className={activeColor} />
        <span className={cn("text-sm capitalize", activeColor)}>{status}</span>
      </div>
      <div className="flex items-center gap-1 justify-self-end">
        {renderBtns()}
        <Button
          variant={"secondary"}
          size={"icon"}
          className="h-8 w-8"
          onClick={onStartEditing}
        >
          <Edit2 className="h-5 w-5" />
        </Button>
        <Button
          variant={"destructive"}
          size={"icon"}
          className="h-8 w-8"
          onClick={onDelete}
        >
          <Trash className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}

export default TaskItem;
