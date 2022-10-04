export enum EndpointsUrl {
  REGISTER = '/auth/local/register',
  LOGIN = '/auth/local',
  CURRENT_USER = '/users/me',
  LIST_EMPLOYEES = '/users?populate=position',
  LIST_SKILLS = '/skills',
  LIST_LANGUAGES = '/languages',
  USERS_UPDATE = '/users/',
  LIST_POSITIONS = '/positions'
}