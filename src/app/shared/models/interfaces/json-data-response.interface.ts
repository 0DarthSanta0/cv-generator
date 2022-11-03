export interface JsonData {
  id: number,
  level: number
}

export interface JsonDataWithAttributes<T> {
  id: number,
  attributes: T
}

export type JsonResponse<T> = {
  data: T,
}

export interface JsonAttributeId {
  ids: number[];
}

export interface JsonAttribute {
  name: string;
}

export interface JsonProject {
  id: number,
  responsibilities: number[]
}

export interface JsonProjectCv {
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

export interface JsonEmployeeCv {
  id: number,
  nameCv: string,
  firstName: string,
  lastName: string,
  education: string,
  position: string,
  descriptionCv: string,
  skills: JsonData[],
  languages: JsonData[],
  projects: JsonProjectCv[],
}