//Imports necesarios
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Import de componenetes
//import { LoginComponent } from "./components/student/Login.component";
import {ReportesComponent} from "./components/reportes/reportes.component";
import { PGPGComponent } from "./components/pgpg/pgpg.component" 
import { ErrorComponent } from './components/error/error.component';


//Definicion de rutas
const appRoutes: Routes = [
    //{ path: '', component: InicioComponent },
    //{ path: 'inicio', component: LoginComponent},
    { path: 'reportes/:categoria', component: ReportesComponent},
    //{ path: 'Reportes-Financieros', component: StudentComponent},
    //{ path: 'Reportes-SS', component: StudentComponent},
    { path: 'promedios-generacion', component: PGPGComponent},
    { path: 'inserts', component: PGPGComponent},
    { path: '**', component: ErrorComponent},
    
    
];


//exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);