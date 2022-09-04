export interface BackendErrorsInterface {
  details: {
    errors: [
      {
        path: string,
        message: string
        name: string,
      }
    ]
  },
  message: string,
  name: string,
  status: number
}