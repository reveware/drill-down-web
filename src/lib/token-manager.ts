import { decodeJwt } from 'jose';
import { JWTPayload } from '@/types/auth';
import { mockJWTPayload } from '@/mocks/auth';
import { USE_MOCKS } from '@/api/constants';

export class TokenManager {
  private static readonly TOKEN_KEY = 'auth_token';

  static getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token;
  }

  static setToken(token: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static removeToken(): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static decodeToken(token: string): JWTPayload | null {
    try {
      if (USE_MOCKS) {
        return mockJWTPayload;
      }

      return decodeJwt(token) as JWTPayload;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  static isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) {
      return true;
    }

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  }

  static isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.isTokenExpired(token);
  }
}
