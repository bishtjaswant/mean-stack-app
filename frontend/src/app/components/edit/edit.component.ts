import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../issues.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
 import { IIssue } from '../../issue.model';
@Component({
  selector: 'mean-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  id: any;
  message;
  updatedIssueData: {
              issue: string,
              responsible: string,
              descriptions: string,
              severity: string,
              status: string
  };
  updateIssueForm: FormGroup;
  constructor(
            private issueService: IssuesService,
            private formBuilder: FormBuilder,
            private router: Router,
            private  route: ActivatedRoute,
            private snackBar: MatSnackBar ) {

               this.createUpdateIssueForm();
             }

  ngOnInit() {
    this.getUpdatedData() ;
  }


  createUpdateIssueForm() {
    this.updateIssueForm = this.formBuilder.group({
      issue: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        this.validIssueDetail
      ])],
      responsible: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])],
      descriptions: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500),
        this.validIssueDetail
      ])],
      severity: '',
      status: '',

    });
  }


  getUpdatedData() {

    this.id = this.route.snapshot.params.id;
    // console.log("current captured id " + this.id);

          //  get specifiic  data
         this.issueService.fetchIssueByID(this.id).subscribe(data => {
           this.updatedIssueData = data.updateBlog;
               console.log(data);


         });



  }


  disableIssueForm() {
    this.updateIssueForm.controls['issue'].disable();
    this.updateIssueForm.controls['responsible'].disable();
    this.updateIssueForm.controls['descriptions'].disable();
    this.updateIssueForm.controls['severity'].disable();
    this.updateIssueForm.controls['status'].disable();
  }



  updatedNewIssueData() {

      const updatedData = {
        issue: this.updateIssueForm.get('issue').value,
        responsible: this.updateIssueForm.get('responsible').value,
        descriptions: this.updateIssueForm.get('descriptions').value,
        severity: this.updateIssueForm.get('severity').value,
        status: this.updateIssueForm.get('status').value,
      };
      console.log(updatedData);
      console.log(this.id);
      this.disableIssueForm();

      this.issueService.updateIssueByIssue(this.id, updatedData).subscribe((data) => {
                     console.log(data);
                     if (!data.status) {
                        this.message = data.message;
                     } else {
                       this.snackBar.open(data.message, 'ok', {
                         duration: 2000,
                       });
                           setTimeout(() => {
                            this.router.navigate(['/list']);
                           }, 3000);
                     }



     });

}


  validIssueDetail(control): { validIssueDetail: boolean } | null {
    const validIssue = new RegExp(/^[a-zA-Z0-9 ]+$/);
    if (validIssue.test(control.value)) {
      return null;
    } else {
      return { 'validIssueDetail': false };
    }
  }





}
