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

export interface JsonAttribute  {
    name: string;
}