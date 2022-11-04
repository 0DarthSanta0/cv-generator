import {
  JsonAttributeId,
  JsonProject,
  JsonResponse
} from '@models/interfaces/json-data-response.interface';

export interface ResponseCVsInterface {
  id: number,
  attributes: {
    name: string,
    description: string,
    projects: JsonResponse<JsonProject[]>,
    languages: JsonResponse<JsonAttributeId>,
    skills: JsonResponse<JsonAttributeId>,
  }
}
