import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IAlbum } from '../pages/models/element';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  
  constructor(private firestore: AngularFirestore) {
  }
  
  public getAlbums(): Observable<DocumentChangeAction<any>[]> {
    return this.firestore.collection('albums').snapshotChanges();
  }
  
  public addAlbum(item: IAlbum): void {
    this.firestore.collection('albums')
      .add(item)
      .then();
  }
  
  public updateAlbum(id: string, item: IAlbum): void {
    this.firestore.doc('albums/' + id).update(item).then();
  }
  
  public deleteAlbum(id: string): void {
    this.firestore.doc('albums/' + id).delete().then();
  }
}
