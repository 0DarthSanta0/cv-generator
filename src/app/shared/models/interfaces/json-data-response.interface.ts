export interface JsonData {
    id: number,
    level: number
}

export interface JsonDataWithAttributes {
    id: number,
    attributes: JsonAttribute
}

export type JsonResponse<T> = {
    data: T,
}

export interface JsonAttribute  {
    name: string;
}