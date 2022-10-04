export interface JsonData {
    id: number,
    level: number
}

export interface JsonDataWithAttributes {
    id: number,
    attributes: {
        name: string
    }
}

export type JsonResponse<T> = {
    data: T,
}