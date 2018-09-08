import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../issues.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'mean-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  issueForm: FormGroup;
  message;
  constructor(
               private issueService: IssuesService,
               private router: Router,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar) {
                 this.createIssueForm();
                }

  ngOnInit( ) {
  }

  createIssueForm() {
    this.issueForm = this.formBuilder.group({
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
      severity: ''

    });
  }



  disableIssueForm() {
    this.issueForm.controls['issue'].disable();
    this.issueForm.controls['responsible'].disable();
    this.issueForm.controls['descriptions'].disable();
    this.issueForm.controls['severity'].disable();
  }

  enableIssueForm() {
    this.issueForm.controls['issue'].enable();
    this.issueForm.controls['responsible'].enable();
    this.issueForm.controls['descriptions'].enable();
    this.issueForm.controls['severity'].enable();
  }


  addIssue() {
    // console.log('hello');

    const  issueData = {
              issue: this.issueForm.get('issue').value,
              responsible: this.issueForm.get('responsible').value,
               descriptions: this.issueForm.get('descriptions').value,
               severity: this.issueForm.get('severity').value,
    };
// console.log(issueData);
    this.disableIssueForm();
      this.issueService.storeIssueData(issueData)
      .subscribe((data) => {
        console.log(data.message);

         if (!data.status) {
              this.message =      data.message;
              this.enableIssueForm();
         } else {
           this.matSnackBar.open(data.message, 'ok', {
             duration: 1000,
           });
           setTimeout(() => {
             this.router.navigate(['/list']);
           }, 2000);
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
