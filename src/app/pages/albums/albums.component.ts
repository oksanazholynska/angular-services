import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { delay, map } from 'rxjs/operators';
import { DialogComponent } from '../../dialog/dialog.component';
import { EditFormComponent } from '../../edit-form/edit-form.component';
import { AlbumService } from '../../services/album.service';
import { IAlbum } from '../models/element';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['band', 'genre', 'label', 'name', 'producer', 'releaseDate', 'actions'];
  public dataSource = new MatTableDataSource<IAlbum[]>();
  
  constructor(private dialog: MatDialog, private albumService: AlbumService) {}
  public ngOnInit(): void {
    this.albumService.getAlbums().pipe(
      map(items => {
        this.isLoading = true;
        return items.map(a => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            const result = { id, ...data, releaseDate: data.releaseDate?.toDate() };
            return result;
          }
        )
      }),
      delay(500),
    )
      .subscribe(data => {
        this.isLoading = false;
        this.dataSource.data = data;
      });
      
  }
  public delete(index: any): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: index
    });
  }
  public editElem(index: any): void {
    this.dialog.open(EditFormComponent, {
      width: '400px',
      height: '80vh',
      data: index
    });
  }
  public add(): void{
    this.dialog.open(EditFormComponent, {
      width: '400px',
      height: '80vh',
    });
  }
}
