import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
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
  pdfRef: AngularFireObject<any>;   // Reference to pdf object, its an Observable too
  username: string = "mor bargig"
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Student
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
  uplodadPdf(uploadedImage) {

  }
}


// class dbHandel {
//   // Initialize Firebase
//   constructor() {
//     firebase.initializeApp(firebaseConfig);
//     this.serverAlive = false
//     this.username = "mor bargig"
//   }

//   newPdf = async () => {
//     if (!this.serverAlive) {
//       firebase.database().ref(`CV/${this.username}/`).set({
//         HebPDF: '',
//         EngPDF: '',
//         language: 'EngPDF',
//         linkedin: '',
//       });
//     } else {
//       await axios.get(`${route}newPdf`)
//     }
//   }

//   getPdf = async () => {
//     // if (this.serverAlive) {
//     //   this.serverAlive = (await axios.get(`${route}isAlive`)).data === 200
//     // }
//     if (!this.serverAlive) {
//       let data
//       await firebase.database().ref(`CV/${this.username}/`).once('value').then((snap) => {
//         data = snap.val()
//         // console.log(snap.val())
//       });
//       // console.log(data)
//       return data
//     } else {
//       const res = await axios.get(`${route}getPdf`)
//       return res.data[0]
//     }
//   }

//   uplodadPdf = async (uploadedImage, noServerUploade = false) => {
//     if (!this.serverAlive || noServerUploade) {
//       try {

//         const storageRef = firebase.storage().ref();
//         const fileRef = storageRef
//           .child(`/CV/${this.username}/${uploadedImage.name}`);

//         const uploadTaskSnapshot = await fileRef.put(uploadedImage);

//         return await uploadTaskSnapshot.ref.getDownloadURL();
//       }
//       catch (error) {
//         console.log("ERR ===", error);
//         alert("Image uploading failed!");
//       }

//     }
//     else {
//       return this.uplodadPdf(uploadedImage, noServerUploade = true)
//       // let data = new FormData();
//       // data.append("file", uploadedImage);

//       // await axios.post(`${route}uploadPdf`, data).then(res => { // then print response status
//       //   console.log(res.statusText)
//       // })
//     }
//   }

//   updatePdf = async (upDate) => {
//     if (!this.serverAlive) {
//       let data
//       await firebase.database().ref(`CV/${this.username}/`).once('value').then((snap) => {
//         data = snap.val()
//       });

//       for (let i in upDate) {
//         if (upDate[i]) {
//           data[i] = upDate[i]
//         }
//       }
//       // console.log(data)
//       await firebase.database().ref(`CV/${this.username}`).set({
//         HebPDF: data.HebPDF,
//         EngPDF: data.EngPDF,
//         language: data.language,
//         linkedin: data.linkedin,
//       });
//     } else {
//       await axios.put(`${route}updatePdf/`, upDate)
//     }
//   }
// }


// export default new dbHandel()



