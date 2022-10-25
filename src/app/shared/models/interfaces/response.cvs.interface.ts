import {
  JsonAttribute,
  JsonDataWithAttributes,
  JsonResponse
} from '@models/interfaces/json-data-response.interface';

export interface ResponseCVsInterface {
  id: number,
  attributes: {
    name: string,
    description: string,
    projects: JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>,
    languages: JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>,
    skills: JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>,
  }
}
