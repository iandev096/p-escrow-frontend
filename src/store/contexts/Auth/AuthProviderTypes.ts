export type authUser =  Partial<{ email: string; fullName: string; userId: string }>;

export type AuthProps = {
  user: authUser,
  init: Function | null,
  login: (email: string, password: string) => any,
  signup: (email: string, password: string, fullName: string) => any,
  logout: () => void,
}

export const authInit: AuthProps = {
  user: null,
  init:  null,
  login: () => { },
  logout: () => { },
  signup: () => { },
}
