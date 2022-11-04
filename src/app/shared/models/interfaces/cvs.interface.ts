import {
  JsonAttributeId,
  JsonProject,
  JsonResponse
} from '@models/interfaces/json-data-response.interface';

export interface CVsInterface {
  id: number,
  name: string,
  description: string,
  projects: JsonResponse<JsonProject[]>,
  languages: JsonResponse<JsonAttributeId>,
  skills: JsonResponse<JsonAttributeId>,
}

export interface CVsSimpleInterface {
  id: number,
  name: string,
  description: string,
  projects: string[],
  languages: string[],
  skills: string[],
}

