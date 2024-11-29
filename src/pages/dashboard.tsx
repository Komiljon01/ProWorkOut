import TaskItem from "@/components/shared/task-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BadgePlus } from "lucide-react";

function Dashboard() {
  return (
    <div className="mx-auto flex h-screen max-w-6xl items-center">
      <div className="grid w-full grid-cols-2 gap-8">
        <div className="flex flex-col space-y-3">
          <div className="flex w-full justify-between rounded-md bg-gradient-to-t from-background to-secondary p-4">
            <h2 className="text-2xl font-bold">Trainings</h2>
            <Button size={"icon"}>
              <BadgePlus />
            </Button>
          </div>
          <Separator />
          <div className="relative flex min-h-60 w-full justify-between rounded-md bg-gradient-to-b from-background to-secondary p-4">
            <div className="flex w-full flex-col space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <TaskItem key={idx} />
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex w-full flex-col space-y-3">
          <div className="relative h-24 rounded-md bg-gradient-to-r from-blue-900 to-background p-4">
            <h3 className="text-2xl font-bold">Total week</h3>
            <h2 className="text-3xl font-bold">02:08:27</h2>
          </div>
          <div className="relative h-24 rounded-md bg-gradient-to-r from-secondary to-background p-4">
            <h3 className="text-2xl font-bold">Total week</h3>
            <h2 className="text-3xl font-bold">02:08:27</h2>
          </div>
          <div className="relative h-24 rounded-md bg-gradient-to-r from-destructive to-background p-4">
            <h3 className="text-2xl font-bold">Total week</h3>
            <h2 className="text-3xl font-bold">02:08:27</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
