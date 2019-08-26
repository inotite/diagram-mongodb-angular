import { Field } from './field.model';

export interface CollectionInterface {
  name: string;
  fields: Field[];
}

export class Collection {
  name: string;
  fields: Field[];
  constructor(data: CollectionInterface) {
    this.name = data.name;
    if (data.fields && data.fields.forEach) {
      this.fields = [];
      data.fields
        .forEach(field => this.fields.push(new Field(field)));
    }
  }
  toString() {
    let str = 'COLLECTION \'' + this.name.toUpperCase() + '\' {\n';
    this.fields.forEach((field, i) => {
      str += field.toString() + (this.fields.length > i ? ',\n' : '' );
    });
    str += '\n}\n';
    return str;
  }
}
