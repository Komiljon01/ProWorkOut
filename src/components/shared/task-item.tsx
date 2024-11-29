import { Card } from "../ui/card";
import { MdOutlineTask } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { CiPlay1 } from "react-icons/ci";
import { Button } from "../ui/button";
import { Edit2, Trash } from "lucide-react";

function TaskItem() {
  return (
    <Card className="relative grid w-full grid-cols-4 items-center p-4 shadow-md">
      <div className="col-span-2 flex items-center gap-1">
        <MdOutlineTask className="text-blue-500" />
        <span className="capitalize">Press</span>
      </div>
      <div className="flex items-center gap-1">
        <HiStatusOnline />
        <span className="text-sm capitalize">Unstarted</span>
      </div>
      <div className="flex items-center gap-1 justify-self-end">
        <Button variant={"ghost"} size={"icon"} className="h-8 w-8">
          <CiPlay1 className="h-5 w-5 text-indigo-500" />
        </Button>
        <Button variant={"secondary"} size={"icon"} className="h-8 w-8">
          <Edit2 className="h-5 w-5" />
        </Button>
        <Button variant={"destructive"} size={"icon"} className="h-8 w-8">
          <Trash className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}

export default TaskItem;
