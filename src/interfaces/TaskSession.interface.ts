import Project from "./Project.interface";
import TaskInterface from "./Task.interface";

export interface TaskSession {
  id: number,
  started_at: string,
  ended_at: string,
  created_at: string,
  task_id: number,
  task: TaskInterface,
  project_id: number,
  project: Project,
}
