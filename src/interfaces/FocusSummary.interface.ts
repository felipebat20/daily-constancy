import TaskInterface from "./Task.interface";
import ProjectInterface from "./Project.interface";

export default interface FocusSummary {
  date: string,
  totalFocusTime: number,
  totalFucusedSessions: number,
  totalTasks: 1,
  totalProjects: 1,
  tasks: TaskInterface[],
  projects: ProjectInterface[],
}
