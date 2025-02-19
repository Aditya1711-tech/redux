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

  // Fetch task details on component mount
  useEffect(() => {
    fetch("http://localhost:8080/1")
      .then((response) => response.json())
      .then((data) => setTask(data));
  }, []);

  useEffect(() => {
    console.log(task);
  }, [task.status, task.issueType, task.startDate, task.endDate, task.summery]);

  // Update the backend with the new task details
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

  // Helper function to update individual fields in the task
  const handleFieldChange = (field: keyof Task, value: string) => {
    setTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  return (
    <div>
      <h2>Task Details</h2>
      <p>
        <strong>Task ID:</strong>{" "}
        <input type="text" value={task.taskId} disabled />
      </p>

      <InputField
        value={task.status}
        onChange={(newValue) => handleFieldChange("status", newValue)}
        handleSave={handleSave}
      />
      <InputField
        value={task.issueType}
        onChange={(newValue) => handleFieldChange("issueType", newValue)}
        handleSave={handleSave}
      />
      <InputField
        value={task.startDate}
        onChange={(newValue) => handleFieldChange("startDate", newValue)}
        handleSave={handleSave}
      />
      <InputField
        value={task.endDate}
        onChange={(newValue) => handleFieldChange("endDate", newValue)}
        handleSave={handleSave}
      />
      <InputField
        value={task.summery}
        onChange={(newValue) => handleFieldChange("summery", newValue)}
        handleSave={handleSave}
      />
    </div>
  );
};

export default TaskDetails;
