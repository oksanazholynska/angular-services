import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import { IAlbum } from '../pages/models/element';
import { AlbumService } from '../services/album.service';

const moment = _moment;

const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditFormComponent implements OnInit {
  public title: string = 'Edit';
  
  public forms: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAlbum,
    private albumService: AlbumService,
  ) {
  }
  
  public get genreFormArray(): FormArray {
    return this.forms.get('genre') as FormArray;
  }
  
  public get labelFormArray(): FormArray {
    return this.forms.get('label') as FormArray;
  }
  
  public get producerFormArray(): FormArray {
    return this.forms.get('producer') as FormArray;
  }
  
  public ngOnInit(): void {
    this.forms = new FormGroup({
      band: new FormControl(null, [Validators.required]),
      genre: new FormArray([]),
      label: new FormArray([]),
      name: new FormControl(null, [Validators.required]),
      producer: new FormArray([]),
      releaseDate: new FormControl(new Date(), [Validators.required]),
    });
    if (this.data) {
      this.data.genre?.forEach(value => {
        this.genreFormArray.push(new FormControl(value, [Validators.required]));
      });
      this.data.label?.forEach(value => {
        this.labelFormArray.push(new FormControl(value, [Validators.required]));
      });
      this.data.producer?.forEach(value => {
        this.producerFormArray.push(new FormControl(value, [Validators.required]));
      });
      this.forms.patchValue({
        band: this.data?.band,
        label: this.data?.label,
        name: this.data?.name,
        producer: this.data?.producer,
        releaseDate: this.data?.releaseDate,
      });
    } else {
      this.title = 'Add';
    }
  }
  
  public addGenre(): void {
    this.genreFormArray.push(new FormControl('', [Validators.required]));
  }
  
  public addLabel(): void {
    this.labelFormArray.push(new FormControl('', [Validators.required]));
  }
  
  public addProducer(): void {
    this.producerFormArray.push(new FormControl('', [Validators.required]));
  }
  
  public deleteGenre(index): void {
    this.genreFormArray.removeAt(index);
  }
  
  public deleteLabel(index): void {
    this.labelFormArray.removeAt(index);
  }
  
  public deleteProducer(index): void {
    this.producerFormArray.removeAt(index);
  }
  
  public onSubmit(): void {
    const currentObject = {
      ...this.forms.getRawValue(),
      releaseDate: moment(this.forms.getRawValue().releaseDate).toDate()
    };
    if (this.data?.id) {
      this.albumService.updateAlbum(this.data.id, currentObject);
    } else {
      this.albumService.addAlbum(currentObject);
    }
  }
}
