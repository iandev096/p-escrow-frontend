

export class AuthCredentialDto {

    email: string;

    phone?: string;

    fullName?: string;

    // @Matches(
    //     /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    //     { message: 'Password too weak' }
    // )
    // (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
    // (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
    // (?=.*[0-9])	The string must contain at least 1 numeric character
    // (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
    // (?=.{8,})	The string must be eight characters or longer
    password: string;
}

export class LoginDto {

  email: string;


  password: string;
}

export class EmailDto {

    email: string;
}

export class UserIdDto {

    userId: string;
}

export class VerifyTokenDto {

    email: string;

    token: string;
}

export class PasswordDto {

    // @Matches(
    //     /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    //     { message: 'Password too weak' }
    // )
    // (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
    // (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
    // (?=.*[0-9])	The string must contain at least 1 numeric character
    // (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
    // (?=.{8,})	The string must be eight characters or longer
    password: string;

}
