import { useState } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./view-switcher";
import { getStartEndDateForProject, initTasks } from "../../helper";
import "gantt-task-react/dist/index.css";
import { useStore } from "../../store/taskStore";

function GanttChart() {
  const [view, setView] = useState(ViewMode.Day);
  const [tasks, setTasks] = useState(initTasks());
  const [isChecked, setIsChecked] = useState(true);

  // store
  const { count, setCount, myTasks, setMyTask, createTask } = useStore();

  // chart column width
  let columnWidth = 90;
  if (view === ViewMode.Month) {
    columnWidth = 600;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }
  console.log(myTasks);
  const handleTaskChange = (task) => {
    /* date change by Id */
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
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
    setMyTask(newTasks);

    setTasks(newTasks);
  };

  const handleTaskDelete = (task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <div>
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Unlimited Height</h3>
      {myTasks.length >= 1 ? (
        <Gantt
          tasks={myTasks}
          viewMode={view}
          onDateChange={handleTaskChange}
          onDelete={handleTaskDelete}
          onProgressChange={handleProgressChange}
          onDoubleClick={handleDblClick}
          onSelect={handleSelect}
          onExpanderClick={handleExpanderClick}
          listCellWidth={isChecked ? "155px" : ""}
          columnWidth={columnWidth}
        />
      ) : (
        <></>
      )}
      <p>{count}</p>
      <button onClick={createTask}>increment</button>
    </div>
  );
}
export default GanttChart;
