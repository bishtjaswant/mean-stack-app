import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../issues.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { IIssue } from '../../issue.model';

@Component({
  selector: 'mean-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  issues: IIssue[];
  displayedDataColumn = ['issue', 'responsible', 'descriptions', 'status', 'severity', 'actions'];

  constructor(
             private issueService: IssuesService,
             private router: Router ) { }

  ngOnInit() {
    this.fetchAllIssue();
   }

   fetchAllIssue() {
     /** GET ALL ISSUE BY SERVICE */
            this.issueService
                .fetchAllIssues()
                .subscribe((data: IIssue[] ) => {
                          this.issues =  data;
                          console.log('data received');
                          console.log(data);
                });
     }


     editIssueData(id) {
        this.router.navigate([`/edit/${id}`]);
     }

     deleteSelectedIssue(id) {
       this.issueService.deleteIssueByID(id)
           .subscribe((data) => {
             this.fetchAllIssue();
             console.log('record deleted');
           });

      }

}
