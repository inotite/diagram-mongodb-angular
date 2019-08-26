import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

import testData from '../../assets/sample.project.json';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Project } from '../models/project.model';



const API_URL = environment.apiUrl;
const TEST_DATA_URL = environment.TEST_DATA_URL;

@Injectable()
export class ProjectsService {
  activeProject: Project = null;
  projects: Project[] = [];
  onChange = new EventEmitter<boolean>();
  constructor(private http: HttpClient) {
    // console.dir(testData);
  }

  public getAll(user: string): Observable<Project[]> {
    const url = API_URL + `/project/${user}`;
    return this.http
      .get(url)
      .pipe(
        map((response: any) => {
          const data = response;
          return data.structures;
        }),
        catchError(this.handleError)
      );
  }

  public getSample(): Observable<boolean> {
    return this.http
      .get(TEST_DATA_URL)
      .pipe(
      map((response: Project[]) => {
        this.projects = [];
        response.forEach(res => this.projects.push(new Project(res)));
        this.activeProject = this.projects[0];
        this.onChange.emit(true);
        return true;
        }),
        catchError(this.handleError)
      );
  }

  public updateStructure(project: Project): Observable<Project> {
    const url = API_URL + '/structure/';
    return this.http
      .put(url + project.id, { project })
      .pipe(
        map((response: any) => {
          const data = response;
          return data.structures;
        }),
        catchError(this.handleError)
      );
  }

  public deleteStructureById(structureId: number) {
    const url = API_URL + `/structure/${structureId}`;
    return this.http
      .delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: Response | any) {
    console.error('ProjectService::handleError', error);
    return throwError(error);
  }
}
