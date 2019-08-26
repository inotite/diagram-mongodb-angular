import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { Collection } from '../models/collection.model';
import { Reference } from '../models/reference.model';

@Injectable()
export class EditorService {
  public text = '';
  public loadProject(project: Project) {
    this.text = '';
    project.collections.forEach((collection: Collection) => {
      this.text += collection.toString();
    });
    project.references.forEach((reference: Reference) => {
      this.text += reference.toString();
    });
  }
}
