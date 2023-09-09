import { ApplicationModule, Component, OnInit } from '@angular/core';
import { ApiCompanyService } from '../services/api-company.service';
import { ResponseTania } from '../models/response';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogCompanyComponent } from './dialog/dialogCompany.component';
import { Company } from '../models/company';
import { DialogDeleteComponent } from '../common/delete/dialogDelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public companies!: any[];
  companies1: Array<Response> = [];
  companies3 = new Object();
  columnas: string[] = ['id', 'nombre', 'taxid', 'cuenta', 'tipo', 'cbu', 'actions'];
  readonly width: string = '3800px';

  constructor(
    private apiCompany: ApiCompanyService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { 
    
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  deleteCom(company: Company)
  {
    console.log('delete');
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      //width:'300'
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result)
      {
        this.apiCompany.deleteCompanies(company.id).subscribe(response =>
          {
            console.log(response);
            this.snackBar.open('eliminado','',{
              duration:2000
            });
            this.getCompanies();
          });
      }
      
    });
  }
  openEdit(company: Company)
  {
    console.log('edit');
    const dialogRef = this.dialog.open(DialogCompanyComponent, {
      //width:'300'
      width: this.width,
      data: company
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getCompanies();
    });
  }

  openAdd(){
    console.log('open');
    const dialogRef = this.dialog.open(DialogCompanyComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getCompanies();
    });
  }
  getCompanies(){
    this.apiCompany.getCompanys().subscribe( response => {
      console.log(response, typeof(response));
      console.log(response.taxId, response.id, response.businessName);
      this.companies = response.data;
      //this.lts  = response;
      console.log(this.companies);
    });
  }

}
