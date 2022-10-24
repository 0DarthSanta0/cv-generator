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
    from: Date,
    to: Date,
    internalName: string,
    skills: JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>,
  }
}
