import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ICvFormResponse } from '@employees';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

    html2canvas(this.content.nativeElement, {allowTaint: true}).then((canvas) => {

      const HTML_Width = canvas.width;
      const HTML_Height = canvas.height
      const top_left_margin = 15;
      const PDF_Width = (HTML_Width + (top_left_margin * 2));
      const PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      const canvas_image_width = HTML_Width;
      const canvas_image_height = HTML_Height;

      const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

      canvas.getContext('2d');
      const img = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);

      pdf.addImage(img, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height+20);

      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage();
        pdf.addImage(img, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height-40);
      }

      return pdf;

    }).then((doc) => {
      doc.save('cv.pdf');
    });

  }

}
