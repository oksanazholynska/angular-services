import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamplesService {
  

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getUnknowUrl() {
    return this.httpClient.get(environment.unknowUrl)
    .pipe(
      catchError(val => of(`I caught: ${val}`))
    )
  }

  getRealUrl() {
    return this.httpClient.get(`${environment.pokeApi}/pokemon/ditto`);
  }

}
