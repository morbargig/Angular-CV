import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";

export interface Pdf {
  HebPDF?: string,
  EngPDF?: string,
  language?: string,
  linkedin?: string,
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  pdfRef: AngularFireObject<any>;   // Reference to pdf object, its an Observable 
  username: string = "mor bargig"
  private password: string

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.password = environment.adminPassword
  }

  // verify admin to edit pdf files
  verifyAdmin(password: string) {
    return password === this.password
  }

  // create new pdf file if there isn't
  newPdf() {
    this.pdfRef.update({
      HebPDF: '',
      EngPDF: '',
      language: 'EngPDF',
      linkedin: '',
    })
  }

  // Fetch pdf
  getPdf() {
    this.pdfRef = this.db.object(`CV/${this.username}`);
    return this.pdfRef;
  }

  // Update pdf Object
  updatePdf(upDate: Pdf) {
    let { pdfRef } = this
    for (let i in upDate) {
      upDate[i] = upDate[i] || pdfRef[i]
    }
    this.pdfRef.update(
      upDate
    )
  }
  // Uploade Pdf file return Promise wich return url
  uplodadPdf(uploadedImage: any) {
    let name = uploadedImage.name;
    name = `CV/${this.username}/` + name
    const fileRef = this.storage.ref(name);
    return new Promise<any>((resolve, reject) => {
      const task = this.storage.upload(name, uploadedImage)
      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(
          res => resolve(res),
          err => reject(err))
        )
      ).subscribe();
    })
  }
}
