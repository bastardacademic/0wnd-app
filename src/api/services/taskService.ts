export interface TaskPayload {
  title: string;
  description?: string;
  deadline?: string; // ISO 8601
  reward?: string;
  punishment?: string;
}

export async function createTask(task: TaskPayload) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function fetchTasks() {
  const res = await fetch("/api/tasks");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}
