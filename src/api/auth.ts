import { HttpClient } from "../utilities/http/httpClient";
import { IAuth } from "../models/auth/auth.interface";
import { AuthCredentialDto } from "../models/auth/auth.dto";
// import { AxiosRequestConfig } from "axios";


const baseUrl = process.env.baseApiUrl;
export class AuthApi extends HttpClient {
    public constructor() {
        super(baseUrl);
        // this._initializeRequestInterceptor(); // Not needed for auth api endpoints
    }

    getOauthLink() {
        return baseUrl + `/auth/google`;
    }

    login(authCredential: AuthCredentialDto) {
        const { email, password } = authCredential;
        return this.axiosInstance.post<IAuth>(baseUrl + '/auth/signin', {
            email,
            password
        });
    }

    signUp(authCredential: AuthCredentialDto) {
        const { email, password, fullName } = authCredential;
        return this.axiosInstance.post<IAuth>(baseUrl + '/auth/signup', {
            email,
            password,
            fullName
        });
    }

    // private _initializeRequestInterceptor = () => {
    //     this.axiosInstance.interceptors.request.use(
    //         this._handleRequest,
    //         this._handleError,
    //     );
    // };

    // private _handleRequest = (config: AxiosRequestConfig) => {
    //     let jwt = '';
    //     if (this.getJWT()) jwt = this.getJWT();
    //     config.headers['Authorization'] = `Bearer ${jwt}`;

    //     return config;
    // };

}