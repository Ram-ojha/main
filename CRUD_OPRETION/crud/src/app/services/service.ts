import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {
  
  ApiUrl = 'http://localhost:3000/api'
  

  constructor(private _httpClint:HttpClient){

  }
  GetStudentData(){
    return this._httpClint.get(this.ApiUrl)
  }
  GetStudentbyId(id:any){
    return this._httpClint.get(`${this.ApiUrl}/${id}`)
  }

  EditStudentifo(id:any,student:any){
   return this._httpClint.put<any>(`${this.ApiUrl}/student/${id}`,student);
  }

   deletestudent(id: number): Observable<Object>{
    return this._httpClint.delete(`${this.ApiUrl}/users/${id}`);
  }
}
