export interface iTaskData {
  weekTotal: number;
  monthTotal: number;
  total: number;
  tasks: iTask[];
}

export interface iTask {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  totalTime: number;
  userId: string;
  status: iTaskStatus;
}

export type iTaskStatus = "unstarted" | "in_progress" | "paused";
