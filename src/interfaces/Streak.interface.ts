import ProjectInterface from "./Project.interface";
import TaskInterface from "./Task.interface";

export default interface StreakInterface {
  id: number,
  name: string,
  created_at: number,
  time_spent_today: number,
  project: ProjectInterface[],
  task: TaskInterface,
}
