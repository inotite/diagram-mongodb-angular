export enum DataTypes {
  id = 'ObjectId',
  boolean = 'Boolean',
  number = 'Number',
  string = 'String',
  date = 'Date',
  object = 'Object',
}

export interface FieldInterface {
  name: string;
  type: DataTypes;
  data: any;
  array: boolean;
  options: string[];
  default: any;
}

export class Field {
  name: string;
  type: DataTypes;
  data: any;
  array: boolean;
  options: string[];
  default: any; // TODO how to implements default field
  constructor(data: FieldInterface) {
    this.name = data.name;
    this.type = data.type;
    this.array = data.array;
    this.options = data.options;
    if (this.type === DataTypes.object) {
      this.data = [];
      data.data.forEach(field => this.data.push(new Field(field)));
    }
  }
  toString(t: string = '\t') {
    let tab = t;
    let str = '';
    if (this.type === DataTypes.object && this.data.forEach) {
      tab += '\t';
      str += t + '\'' + this.name + '\' \n' + tab + '{\n';
      this.data.forEach((field, i) => {
        str += field.toString(tab) +
          (this.data.length > i + 1 ? ',\n' : '\n');
      });
      str += tab + '}';
    } else {
      str += tab + '\'' + this.name + '\' ' + this.type;
      if (this.options && this.options.length) {
        str += ' (';
        this.options.forEach((option, i) => {
          str += option + (i + 1 < this.options.length ? ' ' : '');
        });
        str += ')';
      }
    }
    if (this.array) {
      str += '[]';
    }
    return str;
  }
}
