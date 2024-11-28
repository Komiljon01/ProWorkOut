import { LucideLoader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

function FillLoading() {
  return (
    <Skeleton className="absolute inset-0 z-50 flex h-full w-full items-center justify-center opacity-20">
      <LucideLoader2 className="h-6 w-6 animate-spin" />
    </Skeleton>
  );
}

export default FillLoading;
