export interface EmployeeFormDtoInterface {
    id: number,
    username: string,
    firstName: string,
    lastName: string
    email: string,
    education: string,
    description: string,
    position: string | number,
    skills: {
        skillName: string,
        skillLevel: number,
    }[],
    languages: {
        languageName: string,
        languageLevel: number,
    }[]
}