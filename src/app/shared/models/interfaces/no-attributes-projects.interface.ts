import { JsonAttribute, JsonDataWithAttributes, JsonResponse } from '@models/interfaces/json-data-response.interface';

export interface ProjectsInterface {
  id: number,
  description: string,
  domain: string,
  name: string,
  from: Date,
  to: Date,
  internalName: string,
  skills: JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>,
  responsibilities?: string[]
}

export interface SimpleProjectsInterface {
  id: number,
  name: string,
  description: string,
  domain: string,
  from: string,
  to: string,
  internalName: string,
  skills: (string | number)[],
}

export interface DateProjectsInterface {
  id: number,
  name: string,
  description: string,
  domain: string,
  from: Date,
  to: Date,
  internalName: string,
  skills: (string | number)[],
}


