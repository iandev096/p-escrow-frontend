export enum Provider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  LOCAL = 'local',
}

const baseUrl = process.env.baseApiUrl;
export enum AuthApiUrlAction {
  LOGIN,
  SIGNUP
}