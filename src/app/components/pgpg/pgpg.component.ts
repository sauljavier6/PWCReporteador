import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
//import { Student } from 'src/app/models/student';
import { ReportesService } from '../../services/reportes.service';
import * as XLSX from 'xlsx';




@Component({
  selector: 'app-pgpg',
  templateUrl: './pgpg.component.html',
  styleUrls: ['./pgpg.component.css'],
  providers: [ReportesService],
})
export class PGPGComponent {
  public mostrarBoton: boolean = false;
  public mostrarDiv: boolean = false;
  academicYears: number[] = [];
  academicTerms: string[] = ['1CUATRIMES', '2CUATRIMES', '3CUATRIMES', '1SEMESTRE', '2SEMESTRE', 'ANUAL'];
  academicSessions: string[] = ['ENSENADA', 'TIJUANA', 'MEXICALI', 'VIRTUAL'];
  public students: any[] = [];

  DEGREE: { id: string, descripcion: string }[] = [
    { id: 'PREPAR', descripcion: 'PREPARATORIA' },
    { id: 'LICENC', descripcion: 'LICENCIATURA' },
    { id: 'MAESTR', descripcion: 'MAESTRIA' },
    { id: 'DOCTOR', descripcion: 'DOCTORADO' },
  ];

  CURRICULUM: { id: string, descripcion: string }[] = [
    { id: 'MEDICI', descripcion: 'MEDICINA' },
    { id: 'ARQUIT', descripcion: 'ARQUITECTURA' },
    { id: 'PSICOL', descripcion: 'PSICOLOGIA' },
    { id: 'DERECH', descripcion: 'DERECHO' },
  ];

  constructor(private datePipe: DatePipe, private _reportesService: ReportesService) {
    this.populateAcademicYears();
  }

  ngOnInit() {}

  private populateAcademicYears() {
    const currentYear = new Date().getFullYear();
    const startYear = 2019;

    for (let year = currentYear; year >= startYear; year--) {
      this.academicYears.push(year);
    }
  }

  async onSubmit(form: any) {
    if (form.valid) {
      const formData = form.value;
      console.log('Datos del formulario:', formData);
      this.students = await this._reportesService.getCategories(formData);
      if(this.students && this.students.length > 0){
        console.log('si hay respuesta')
        console.log(this.students);

        //liberar boton generar excel
        this.mostrarBoton = true;
        //Bloquear boton del div No hay datos gener
        this.mostrarDiv = false;
      }else{
        console.log('no hay respuesta')
        //liberar boton generar excel
        this.mostrarBoton = false;
        //Bloquear boton del div No hay datos gener
        this.mostrarDiv = true;
      }
    }
  }

  exportarATablaExcel(): void {
    // Crear un nuevo libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Combinar encabezados y datos de la tabla en una sola matriz
    const encabezadosYDatos: any[][] = [
      ['Reporte de Estudiantes'],
      ['Información detallada'],
      ['CAMPUS:', this.students[0].ACADEMIC_SESSION],
      ['NOMBRE DE LICENCIATURA O POSGRADO:', 'Nivel: ' + this.students[0].NIVEL, 'Curriculum: ' + this.students[0].CURRICULUM],
      ['CICLO DE FINALIZACIÓN DE CRÉDITOS ACADÉMICOS:'],
      ['CICLO DE INICIO DE LOS ESTUDIOS:']
    ];

    // Agregar encabezados de la tabla
    const headers = ['Nombre', 'GENERO', 'GRUPO DE EDAD', ...Array.from({ length: 11 }, (_, i) => `${i + 1}o.`), 'PROMEDIO TOTAL CALIFICACIONES'];
    encabezadosYDatos.push(headers);

    // Agregar datos de la tabla
    this.students.forEach(student => {
      const rowData: any[] = [
        student.LegalName,
        student.GENDER === 'F' ? '2' : (student.GENDER === 'M' ? '1' : ''),
        student.Edad,
        ...student.Niveles.map((nivel: { COMPLETED: string }) => nivel.COMPLETED)
      ];
      encabezadosYDatos.push(rowData);
    });
    // Crear una hoja de trabajo con la matriz combinada
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(encabezadosYDatos);

    // Agregar la hoja de trabajo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte de Estudiantes');

    // Guardar el archivo Excel
    XLSX.writeFile(wb, 'reporte_estudiantes.xlsx');
  }

  
}
