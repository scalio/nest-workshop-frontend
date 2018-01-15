import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  setItem(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  setObject(key: string, object) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  getObject<T>(key: string): T {
    if (!this.hasKey(key)) {
      return {} as T;
    }
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return {} as T;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  hasKey(key: string): boolean {
    return !!localStorage.getItem(key);
  }
}
