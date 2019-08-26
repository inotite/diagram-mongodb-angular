import { Collection } from './collection.model';
import { Reference } from './reference.model';

export interface ProjectInterface {
  id: string;
  name: string;
  collections: Collection[];
  references: Reference[];
}

export class Project {
  id: string;
  name: string;
  collections: Collection[];
  references: Reference[];
  constructor(data: ProjectInterface) {
    this.name = data.name;
    this.id = data.id;
    if (data.collections) {
      this.collections = [];
      data.collections
      .forEach(collection => this.collections
        .push(new Collection(collection)));
    }
    if (data.references) {
      this.references = [];
      data.references
      .forEach(reference => this.references
        .push(new Reference(reference)));
    }
  }
}
