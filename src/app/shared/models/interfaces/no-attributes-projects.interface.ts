import { JsonAttribute, JsonDataWithAttributes, JsonResponse } from '@models/interfaces/json-data-response.interface';

export interface ProjectsInterface {
  id: number,
  name: string,
  description: string,
  domain: string,
  from: Date,
  to: Date,
  internalName: string,
  skills: JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>,
}

export interface SimpleProjectsInterface {
  id: number,
  name: string,
  description: string,
  domain: string,
  from: Date,
  to: Date,
  internalName: string,
  skills: (string | number)[],
}


