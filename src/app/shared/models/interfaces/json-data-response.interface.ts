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

export interface JsonAttribute {
  name: string;
}

export interface JsonProject {
  id: number,
  responsibilities: number[]
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
  projects: JsonProject[],
}