import { localStorageKey } from "../constants/jwt";
import jwtDecode from 'jwt-decode';
import { IJwtPayload } from "../models/auth/auth.interface";


export class JWTService {

    static setJWT(jwt: string) {
        localStorage.setItem(localStorageKey, jwt);
    }

    static getJWT() {
        return localStorage.getItem(localStorageKey);
    }

    static clearJWT() {
        console.log('called clearJWT')
        localStorage.setItem(localStorageKey, '');
    }

    static decodeJWT(token: string) {
        return jwtDecode(token);
    }

    static getDecodedJWT() {
        const token = this.getJWT();
        if (token) {
            const decoded = this.decodeJWT(token) as IJwtPayload;
            return decoded;
        }
        return null;
    }

    static getUserAfterDecode() {
        const decoded = this.getDecodedJWT();
        if (decoded) {
            
            const user = {
                email: decoded.email,
                fullName: decoded.fullName,
                userId: decoded.userId,
                verification: decoded.verification
            }
            return user;
        }
        return null;
    }

}