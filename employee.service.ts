import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/api/v1/employees";

  constructor(private httpClient: HttpClient) { }
  
  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  findByName(name: any): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}?name=${name}`);
  }

  createEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}`);
  }

  findByDomain(): Observable<Employee[]> {
    console.log("i ca,e here");
    return this.httpClient.get<Employee[]>(`${this.baseURL}/techEmp`);
  }

  findByNonTechDomain(): Observable<Employee[]> {
    console.log("i ca,e to non tech here");
    return this.httpClient.get<Employee[]>(`${this.baseURL}/nonTechEmp`);
}
}