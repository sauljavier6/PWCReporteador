import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public categoriaSeleccionada: string|any;
  // En tu servicio o componente
reportes = [
  {
    categoria: 'escolares',
    enlaces: [
      { nombre: 'Reporte: Promedios Generales por Generacion', ruta: '/promedios-generacion' },
      { nombre: 'Reporte: Lista de Alumnos Activos', ruta: 'pagina2' },
      { nombre: 'Reporte: Eficiencia Terminal', ruta: 'pagina3' },
      { nombre: 'Kardex Institucional Activo', ruta: 'pagina4' },
      { nombre: 'Reporte: Alta ordinaria', ruta: 'pagina5' }
    ]
  },
  {
    categoria: 'financieros',
    enlaces: [
      { nombre: 'Reporte: Prueba financieros', ruta: 'pagina1' },
      { nombre: 'Reporte: Prueba financieros 2', ruta: 'pagina1' },
      { nombre: 'Reporte: Prueba financieros 3', ruta: 'pagina1' },
    ]
  },
  {
    categoria: 'serviciosocial',
    enlaces: [
      { nombre: 'Reporte: Prueba servicio social', ruta: 'pagina1' },
    ]
  },
  // Agregar más categorías según sea necesario
];


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoriaSeleccionada = params['categoria'];
    });
  }
}
