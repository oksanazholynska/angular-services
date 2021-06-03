import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, mergeMap, switchMap } from 'rxjs/operators';
import { ExamplesService } from '../../services/examples.service';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html'
})
export class ExamplesComponent {

  constructor(
    private readonly examplesService: ExamplesService
  ) { }

  getUnknowUrl$() {
    return this.examplesService.getUnknowUrl();
  }

  getRealUrl$() {
    return this.examplesService.getRealUrl();
  }

  callBackend() {
    this.getRealUrl$()
      .pipe(
        switchMap(() => this.getUnknowUrl$())
      )
      .subscribe(
        res => {
          console.log(res);
        }
      );
  }

}
