export interface CurrentUserInterface {
  id: number,
  username: string,
  firstName: string,
  lastName: string
  email: string,
  education: string,
  description: string,
  cvs: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string,
  languages: string,
  skills: string,
  jwt: string
}