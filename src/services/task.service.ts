import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";
import { iTask, iTaskData } from "@/types";

export const taskService = {
  getTasks: async () => {
    let weekTotal = 0;
    let monthTotal = 0;
    let total = 0;

    const q = query(collection(db, "tasks"));
    const querySnapshot = await getDocs(q);

    let taskData: iTaskData;

    const tasks = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as iTask[];

    taskData = { tasks, weekTotal, monthTotal, total };

    return taskData;
  },
};
