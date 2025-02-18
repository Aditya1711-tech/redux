import React, { useEffect, useState } from "react";
import InputField from "./InputField";

interface Task {
  endDate: string;
  issueType: string;
  startDate: string;
  status: string;
  summery: string;
  taskId: number;
}

const TaskDetails: React.FC = () => {
  const [task, setTask] = useState<Task>({
    endDate: "",
    issueType: "",
    startDate: "",
    status: "",
    summery: "",
    taskId: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/1")
      .then((response) => response.json())
      .then((data) => setTask(data));
  }, []);

  const handleSave = () => {
    fetch("http://localhost:8080/1", {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTask(data));
  };

  return (
    <div>
      <h2>Task Details</h2>
      <p>
        Task ID: <input type="text" value={task.taskId} disabled />
      </p>
      <InputField value={task.status} handleSave={handleSave} key="status"/>
      <p>Status: {task.status}</p>
      <p>Issue Type: {task.issueType}</p>
      <p>Start Date: {task.startDate}</p>
      <p>End Date: {task.endDate}</p>
      <p>Summery: {task.summery}</p>
    </div>
  );
};

export default TaskDetails;
