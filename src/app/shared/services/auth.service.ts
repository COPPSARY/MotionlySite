import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { motionlyApiUrl } from '../config/runtime-config';

export interface MotionlyUser {
  readonly id: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly displayName: string;
  readonly avatarUrl: string | null;
}

interface AuthResponse {
  readonly data: {
    readonly user: MotionlyUser;
    readonly csrfToken: string;
  };
}

const PENDING_RETURN_KEY = 'motionly-pending-return-url';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  readonly apiUrl = motionlyApiUrl();

  async currentUser(): Promise<MotionlyUser | null> {
    try {
      const response = await firstValueFrom(
        this.http.get<AuthResponse>(`${this.apiUrl}/v1/auth/me`, { withCredentials: true }),
      );
      return response.data.user;
    } catch {
      return null;
    }
  }

  async login(email: string, password: string): Promise<MotionlyUser> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(
        `${this.apiUrl}/v1/auth/login`,
        { email, password },
        { withCredentials: true },
      ),
    );
    return response.data.user;
  }

  googleLoginUrl(): string {
    return `${this.apiUrl}/v1/auth/google`;
  }

  setPendingReturnUrl(url: string): void {
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(PENDING_RETURN_KEY, url);
  }

  consumePendingReturnUrl(): string | null {
    if (typeof sessionStorage === 'undefined') return null;
    const url = sessionStorage.getItem(PENDING_RETURN_KEY);
    sessionStorage.removeItem(PENDING_RETURN_KEY);
    return url;
  }
}
