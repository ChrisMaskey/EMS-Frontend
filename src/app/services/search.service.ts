// search.service.ts
import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private httpClient = inject(HttpClient);
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  getEmployeeData() {
    return this.httpClient.get('http://vertex90-001-site1.atempurl.com/api/Employee/get-all-employees')
  }

  
}
