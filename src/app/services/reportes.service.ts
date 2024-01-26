import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Student } from "../models/student";
import { global } from "./global";
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReportesService {
    public url: string|any;
    

    constructor(
            private _http: HttpClient
        ){
            this.url=global.url;
        }

        async getCategories(form:any) {
            try {
                const params = form;

                const response = await this._http.post<any>(this.url + 'academic/reportepromediogeneralesporgeneracion', { json: JSON.stringify(params) }).toPromise();

                if (response.students && response.students.length > 0) {
                    return response.students;
                } else {
                    console.log('No hay estudiantes en la respuesta.');
                }
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        }          
    }