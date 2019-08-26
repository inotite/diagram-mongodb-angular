import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { Observable } from 'rxjs';
import { Project } from '../../../models/project.model';
import { EditorService } from '../../../services/editor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy {
  projects: Project[];
  constructor(
    private projectsService: ProjectsService,
    private editorService: EditorService
  ) { }
  // TODO put all in one ActionService
  ngOnInit() {
    this.loadSample();
  }
  loadSample() {
    this.projectsService.getSample().subscribe((result: boolean) => {
      if (result && this.projectsService.projects.length > 0) {
        this
          .editorService.loadProject(this.projectsService.projects[0]);
      }
    });
  }
  ngOnDestroy() {
    this.projectsService.getSample();
  }
}
