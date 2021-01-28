import { Component, OnInit } from '@angular/core';
import { ApiService, Pdf } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  pdf: Pdf
  openMenu: boolean = false
  changePdf: boolean = false
  img: any = undefined
  uploadedImage: any = undefined
  url: string = "https://firebasestorage.googleapis.com/v0/b/morbargig-a81d2.appspot.com/o/CV%2Fno-photo-available.png?alt=media&token=27b382af-7a35-4551-ade9-5edb5271df6b"
  buttonsText: Array<object> = [
    { eName: "English", hName: "אנגלית", name: "EngPDF" },
    { eName: "Hebrew", hName: "עברית", name: "HebPDF" },
    { eName: "linkedin", hName: "לינקדין", name: "linkedin" }
  ]

  constructor(
    private PdfApi: ApiService, // Inject API in constructor
  ) { }

  ngOnInit() {
    this.PdfApi.getPdf().valueChanges().subscribe(data => {
      this.pdf = data
      this.url = this.pdf[this.pdf.language]
    })

    // localforage.getItem("VERSION").then((version) => {
    //   let app_version = process.env.VUE_APP_VERSION;
    //   if (version !== app_version) {
    //     localforage.clear();
    //     localforage.setItem("VERSION", app_version);
    //   }
    //   this.setPdfs();
    // });
  }
  newPdf() {
    this.PdfApi.newPdf()
  }
  UpdatePdf() {
    // this.pdfApi.uplodadPdf(uploadedImage)
    // uplodadPdf
  }
  handleImage(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.uploadedImage = image;
    }
  }
  openMenuFunc() {
    this.openMenu = !this.openMenu
  }
  handleUpload() {
    const { uploadedImage } = this;
    if (uploadedImage === null) {
      alert("Please pick a valid image!");
    } else {
      // this.PdfApi.uplodadPdf(uploadedImage).then((url) => {
      //   this.img = url;
      //   this.updatePdf();
      // });
    }
  }
  admin() {
    let Password = prompt("Please enter your Admin Password", "Password");

    if (Password === null || Password === "" || Password === "Password") {
      return null;
    }
    if (Password === "bargig123456") {
      this.changePdf = true;
    }
    if (Password !== "bargig123456") {
      alert("Hi your not my Admin, watch out!! ");
    }
  }
  updatePdf() {
    let answer = prompt("R U Update English PDF", "yes ,no or link");
    let language;
    if (answer === null || answer === "" || answer === "yes ,no or link") {
      alert(" cencel update");
    }
    if (answer === "yes") {
      language = "EngPDF";
    }
    if (answer === "no") {
      language = "HebPDF";
    }
    if (answer === "link") {
      language = "linkedin";
    }
    let pdf = this.img;
    let upDate = {
      [language]: pdf,
      language: language,
    };
    this.PdfApi.updatePdf(upDate);
  }
  getPDF(name) {
    let upDate = {
      language: name,
    };
    this.url = this[name];
    this.PdfApi.updatePdf(upDate);
  }
  isMobile() {
    let a = navigator.userAgent || navigator.vendor

    if (
      (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
    ) {
      return true;
    }
    return false
  }
}


