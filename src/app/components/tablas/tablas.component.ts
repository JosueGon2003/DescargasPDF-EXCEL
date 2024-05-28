import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-tablas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablas.component.html',
  styleUrl: './tablas.component.css'
})

export class TablasComponent {

  datos = [
    {
      Nombre: 'Ana',
      Apellido: 'Lopez',
      Year: 29,
      Genero: 'F',
      Correo: 'ana.lopez@example.com',
      Telefono: '0912345567',
      Direccion: 'Calle Sol 45, Madrid'
    },
    {
      Nombre: 'Carlos',
      Apellido: 'Martinez',
      Year: 28,
      Genero: 'M',
      Correo: 'carlos.martinez@example.com',
      Telefono: '0961234567',
      Direccion: 'Avenida Luna 78, Barcelona'
    },
    {
      Nombre: 'Laura',
      Apellido: 'Gomez',
      Year: 31,
      Genero: 'F',
      Correo: 'laura.gomez@example.com',
      Telefono: '0913456789',
      Direccion: 'Paseo del Prado 101, Valencia'
    },
    {
      Nombre: 'Miguel',
      Apellido: 'Fernandez',
      Year: 29,
      Genero: 'M',
      Correo: 'miguel.fernandez@example.com',
      Telefono: '0914567890',
      Direccion: 'Calle Gran Via 121, Sevilla'
    },
    {
      Nombre: 'Lucia',
      Apellido: 'Perez',
      Year: 27,
      Genero: 'F',
      Correo: 'lucia.perez@example.com',
      Telefono: '0915678901',
      Direccion: 'Avenida de America 135, Madrid'
    },
    {
      Nombre: 'Jorge',
      Apellido: 'Ruiz',
      Year: 30,
      Genero: 'M',
      Correo: 'jorge.ruiz@example.com',
      Telefono: '0916789012',
      Direccion: 'Calle Serrano 56, Barcelona'
    },
    {
      Nombre: 'Elena',
      Apellido: 'Diaz',
      Year: 34,
      Genero: 'F',
      Correo: 'elena.diaz@example.com',
      Telefono: '0917890123',
      Direccion: 'Plaza Mayor 78, Valencia'
    },
    {
      Nombre: 'Pablo',
      Apellido: 'Garcia',
      Year: 26,
      Genero: 'M',
      Correo: 'pablo.garcia@example.com',
      Telefono: '0918901234',
      Direccion: 'Calle Arenal 90, Sevilla'
    }
  ];

  downloadExcel() {
  const data = document.getElementById('table-data');
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const wscols = [
    { wch: 20 }, 
    { wch: 20 }, 
    { wch: 10 }, 
    { wch: 10 }, 
    { wch: 30 }, 
    { wch: 15 }, 
    { wch: 40 } 
  ];
  ws['!cols'] = wscols;

  XLSX.writeFile(wb, 'TabladeDatos.xlsx');
  }
  
  
  constructor() { }

  ngOnInit(): void {
  }


  downloadPdf() {
    const pdf = new jsPDF();
    const docWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = 30;
    const imgHeight = 20;
    const imgX = docWidth - imgWidth - 10; 
    const imgY = 0; 
    pdf.setTextColor(128, 0, 128);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold'); 
    pdf.text('Tabla de Datos', 105, 10, { align: 'center' });
    pdf.addImage('../../../assets/MMO.png', imgX, imgY, imgWidth, imgHeight);
    const tableY = imgY + imgHeight + 10; 
    //@ts-ignore
    pdf.autoTable({
      startY: tableY,
      head: [['Nombre', 'Apellido', 'Año', 'Género', 'Correo', 'Teléfono', 'Dirección']],
      body: this.datos.map(obj => [obj.Nombre, obj.Apellido, obj.Year, obj.Genero, obj.Correo, obj.Telefono, obj.Direccion]),
      margin: { top: 20 },
      styles: {
        lineWidth: 0.1,
        lineColor: [0, 0, 0], 
        fillColor: [255, 255, 255 ] 
      },
      headStyles: {
        fillColor: [128, 0, 128],
        textColor: [255, 255, 255],

      },
    });

    pdf.save('TabladeDatos.pdf');
}

}
