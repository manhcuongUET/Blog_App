import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '@shared/services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  isLoading$: Observable<any>;
  constructor(private  spinnerService: SpinnerService) {
    this.isLoading$ = this.spinnerService.loading$;
  }


}
