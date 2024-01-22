import create from "zustand";
import { getStartEndDateForProject, initTasks } from "../helper";

const a = (task, tasks) => {
  let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
  if (task.project) {
    const [start, end] = getStartEndDateForProject(newTasks, task.project);
    const project = newTasks[newTasks.findIndex((t) => t.id === task.project)];
    if (
      project.start.getTime() !== start.getTime() ||
      project.end.getTime() !== end.getTime()
    ) {
      const changedProject = { ...project, start, end };
      newTasks = newTasks.map((t) =>
        t.id === task.project ? changedProject : t
      );
    }
  }
  return newTasks;
};

const currentDate = new Date();
const tasksD = [
  {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    name: "Main project",
    id: "ProjectSample",
    progress: 25,
    type: "project",
    hideChildren: false,
  },
  {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2, 12, 28),
    name: "Idea",
    id: "Task 0",
    progress: 45,
    type: "task",
    project: "ProjectSample",
  },
  {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
    name: "Research",
    id: "Task 1",
    progress: 25,
    dependencies: ["Task 0"],
    type: "task",
    project: "ProjectSample",
  },
  {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
    name: "Discussion with team",
    id: "Task 2",
    progress: 10,
    dependencies: ["Task 1"],
    type: "task",
    project: "ProjectSample",
  },
  {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
    name: "Developing",
    id: "Task 3",
    progress: 2,
    dependencies: ["Task 2"],
    type: "task",
    project: "ProjectSample",
  },
  {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
    name: "Review",
    id: "Task 4",
    type: "task",
    progress: 70,
    dependencies: ["Task 2"],
    project: "ProjectSample",
  },
  {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    name: "Release",
    id: "Task 6",
    progress: currentDate.getMonth(),
    type: "milestone",
    dependencies: ["Task 4"],
    project: "ProjectSample",
  },
  {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
    name: "Party Time",
    id: "Task 9",
    progress: 0,
    isDisabled: true,
    type: "task",
  },
];

export const useStore = create((set) => ({
  myTasks: [],
  count: 10,
  setCount: (value) => set((state) => ({ count: state.count + value })),
  setMyTask: (newTasks) => set(() => ({ myTasks: newTasks })),
  createTask: () =>
    set(() => ({
      myTasks: initTasks(),
    })),
  removeAllBears: () => set({ bears: 0 }),
}));
