import ProjectInterface from "./Project.interface";

export default interface TaskInterface {
  time_spent: number,
  description: string,
  project: ProjectInterface,
}