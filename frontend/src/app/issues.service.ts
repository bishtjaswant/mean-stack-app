import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private issueURL = 'http://localhost:8080/api/issues';

  constructor(private _http: HttpClient) { }

  /** GET ALL ISSUE BY SERVICE */
  fetchAllIssues() {
    return this._http.get<any>(`${this.issueURL}`);
  }


  /** GET specific ISSUE BY SERVICE */
 fetchIssueByID( id ) {
   return this._http.get<any>(`${this.issueURL}/${id}`);
 }

 /** store the issue data  */
  storeIssueData( issueData ) {
    return this._http.post<any>(`http://localhost:8080/api/issues/create`, issueData );
  }

  /** DELETE specific ISSUE BY SERVICE */
  deleteIssueByID(id) {
    return this._http.delete(`http://localhost:8080/api/issues/remove/${id}`);
  }



  /** update specific  issue */
  updateIssueByIssue( id, updateIssue) {
    const updateIssueData = {
      issue: updateIssue.issue,
      responsible: updateIssue.responsible,
      descriptions: updateIssue.descriptions,
      severity: updateIssue.severity,
      status: updateIssue.status,
    };
    return this._http.put<any>(`http://localhost:8080/api/issues/update/${id}`, updateIssueData );
  }



}
