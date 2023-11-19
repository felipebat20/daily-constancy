import TaskInterface from "./Task.interface";
import ProjectInterface from "./Project.interface";

export default interface FocusSummary {
  date: string,
  totalFocusTime: number,
  totalFucusedSessions: number,
  totalTasks: number,
  totalProjects: number,
  tasks: TaskInterface[],
  projects: ProjectInterface[],
}
