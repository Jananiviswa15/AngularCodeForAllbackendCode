import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee'
import { EmployeeService } from '../employee.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  firstName : String = "";
  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }
  searchByFirstName() : any{
    this.employeeService.findByName(this.firstName).subscribe(details => {
      this.employees= details;
      console.log(details);
    },
      error => {
        console.log(error);
      });
  }
  removeAllEmployees() : void{
    var status = confirm("Are you sure to delete all the records?");
    if (status == true) {
      this.employeeService.deleteAll().subscribe(details => {
        console.log(details);
        this.getEmployees();
      },
        error => {
          console.log(error);
        })
    }
    else{
    this.getEmployees();
  }
  }
  getTechEmps() {
    this.employeeService.findByDomain().subscribe({
      next: (res) => {
      console.log(res);
      this.employees = res;
    },
    error: (e) => console.error(e)
  });
  }

  getNonTechEmps(){
    this.employeeService.findByNonTechDomain().subscribe({
      next: (res) => {
      console.log(res);
      this.employees = res;
    },
    error: (e) => console.error(e)
  });
  }
  private getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    var status = confirm("Are you sure to delete this record?");
    if (status == true) {
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })
  }
    else{
      this.getEmployees();
    }
  }
}