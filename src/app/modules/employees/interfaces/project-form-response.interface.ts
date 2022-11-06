export interface IProjectFormResponse {
  id: number,
  description: string,
  domain: string,
  name:string,
  from: Date,
  to: Date,
  internalName: string,
  responsibilities: string[],
  techStack: string[],
  skills: any
}