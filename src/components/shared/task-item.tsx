import { Card } from "../ui/card";
import { MdOutlineTask } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { CiPlay1 } from "react-icons/ci";
import { Button } from "../ui/button";
import { Edit2, Trash } from "lucide-react";
import { iTask } from "@/types";

interface Props {
  task: iTask;
  onStartEditing: () => void;
  onDelete: () => void;
}

function TaskItem({ task, onStartEditing, onDelete }: Props) {
  const { title, status } = task;

  return (
    <Card className="relative grid w-full grid-cols-4 items-center p-4 shadow-md">
      <div className="col-span-2 flex items-center gap-1">
        <MdOutlineTask className="text-blue-500" />
        <span className="capitalize">{title}</span>
      </div>
      <div className="flex items-center gap-1">
        <HiStatusOnline />
        <span className="text-sm capitalize">{status}</span>
      </div>
      <div className="flex items-center gap-1 justify-self-end">
        <Button variant={"ghost"} size={"icon"} className="h-8 w-8">
          <CiPlay1 className="h-5 w-5 text-indigo-500" />
        </Button>
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
