// search.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private httpClient = inject(HttpClient);
  private searchTermSubject = new BehaviorSubject<{
    key: string;
    value: string;
    source: string;
  }>({ key: '', value: '', source: '' });
  searchTerm$ = this.searchTermSubject.asObservable();

  setSearchTerm(term: { key: string; value: string; source: string }) {
    this.searchTermSubject.next(term);
  }

  getEmployeeData() {
    return this.httpClient.get(
      'https://vertex90-001-site1.atempurl.com/api/User/get-all-employees'

    );
  }

  
}
