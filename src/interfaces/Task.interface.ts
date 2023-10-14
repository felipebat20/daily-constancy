import ProjectInterface from "./Project.interface";

export default interface TaskInterface {
  id: number,
  time_spent: number,
  total_time_spent: number,
  description: string,
  project: ProjectInterface,
  createdAt?: Date,
  updatedAt?: Date,
}
