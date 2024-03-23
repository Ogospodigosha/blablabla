import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem(key: string): string | null {
    return localStorage.getItem(key) || null;
  }

  setItem(key: string, data: any){
    localStorage.setItem(key, data);

  }

}
