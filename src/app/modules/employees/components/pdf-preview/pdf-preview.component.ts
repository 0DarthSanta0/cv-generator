import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ICvFormResponse } from '@employees';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PdfPreviewComponent implements OnInit {

  @Input() public formData: ICvFormResponse;

  @Input() public isDownload$: BehaviorSubject<boolean>;

  @ViewChild('content', {'static': true}) content: ElementRef;

  public ngOnInit(): void {
    this.isDownload$.subscribe((isDownload) => {
      if (isDownload) {
        this.downloadPdf();
      }
    });
  }

  private downloadPdf(): void {

    html2canvas(this.content.nativeElement).then((canvas) => {
      const img = canvas.toDataURL();
      const doc = new jsPDF('p', 'mm', 'a4');
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;

    }).then((doc) => {
      doc.save('cv.pdf');
    });

  }

}
