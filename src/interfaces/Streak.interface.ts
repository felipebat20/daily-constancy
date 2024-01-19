import ProjectInterface from "./Project.interface";
import TaskInterface from "./Task.interface";

export default interface StreakInterface {
  id: number,
  name: string,
  created_at: number,
  time_spent_today: number,
  projects: ProjectInterface[],
  task: TaskInterface,
  offensive?: {
    days: number,
    today_is_in_streak: boolean
  }
}
