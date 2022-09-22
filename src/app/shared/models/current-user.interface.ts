export interface CurrentUserInterface {
    id: number,
    username: string,
    firstName: string,
    lastName: string
    email: string,
    education: string,
    description: string,
    jwt: string,
    position: string,
    cvs: {
        ids: number[]
    },
    languages: {
        ids: number[]
    },
    skills: {
        ids: number[],
    },
}