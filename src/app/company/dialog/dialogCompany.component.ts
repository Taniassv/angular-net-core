import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/models/company';
import { ApiCompanyService } from 'src/app/services/api-company.service';

@Component({
    templateUrl: 'dialogCompany.component.html'
})

export class DialogCompanyComponent{
    businessName: string = '';
    taxId: string ="";
    companyType: number = 0;
    accountNumber: string = '';
    cbu: string = '';

    constructor(
        public dialogRef: MatDialogRef<DialogCompanyComponent>,
        public apiCompany: ApiCompanyService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public company: Company
    ){
        if(this.company !== null)
        {
            this.businessName = company.businessName;
            this.taxId = company.taxId;
            this.companyType = company.companyType;
            this.accountNumber = company.accountNumber;
            this.cbu = company.cbu;
        }
    }

    close()
    {
        this.dialogRef.close();
    }
    editCompany()
    {
        const company: Company = {businessName: this.businessName, id: this.company.id, taxId: this.taxId, 
            companyType: this.companyType, accountNumber: this.accountNumber, cbu: this.cbu}
        console.log(company)
        this.apiCompany.editCompanies(company).subscribe(response =>
            {
                if(response != null)
                {
                    this.dialogRef.close();
                    this.snackBar.open('company editado','',{
                            duration: 2000
                    });
                }
            }       
             );
    }

    addCompany(){
        const company: Company = {businessName: this.businessName, id: 0, taxId: this.taxId, 
            companyType: this.companyType, accountNumber: this.accountNumber, cbu: this.cbu};
        this.apiCompany.addCompanies(company).subscribe(response =>
            {
                if(response != null)
                {
                    this.dialogRef.close();
                    this.snackBar.open('company insertado','',{
                            duration: 2000
                    });
                }
            }       
             );
    }
}