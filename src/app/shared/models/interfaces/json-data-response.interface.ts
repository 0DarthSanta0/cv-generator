export interface JsonData {
  id: number,
  level: number
}

export interface  JsonAttributeId {
  ids: number[];
}

export interface JsonDataWithAttributes<T> {
  id: number,
  attributes: T
}

export type JsonResponse<T> = {
  data: T,
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
  skills: string[]
  responsibilities?: string[],
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

export interface JsonAttribute  {
    name: string;
}
