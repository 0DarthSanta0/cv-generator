export interface JsonData {
    id: number,
    level: number
}

export interface JsonProject {
  id: number;
  responsibilities: [];
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

export interface JsonAttribute  {
    name: string;
}
