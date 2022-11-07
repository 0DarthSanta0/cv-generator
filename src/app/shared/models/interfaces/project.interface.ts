import {
  JsonAttribute,
  JsonData,
  JsonDataWithAttributes,
  JsonResponse
} from '@models/interfaces/json-data-response.interface';

export interface ResponseProjectInterface {
  id: number,
  attributes: {
    name: string,
    description: string,
    domain: string,
    from: string,
    to: string,
    internalName: string,
    skills: JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>,
  }
}
