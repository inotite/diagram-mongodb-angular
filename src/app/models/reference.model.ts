export enum ReferenceType {
  oneToOne = 'One to One',
  oneToMany = 'One to Many',
  manyToMany = 'Many to Many'
}

export interface ReferenceInterface {
  collectionOne: string;
  fieldOne: string;
  collectionTwo: string;
  fieldTwo: string;
  type: ReferenceType;
}

export class Reference {
  collectionOne: string;
  fieldOne: string;
  collectionTwo: string;
  fieldTwo: string;
  type: ReferenceType;
  constructor(data: ReferenceInterface) {
    this.collectionOne = data.collectionOne;
    this.fieldOne = data.fieldOne;
    this.collectionTwo = data.collectionTwo;
    this.fieldTwo = data.fieldTwo;
    this.type = data.type;
  }
  toString() {
    let str = 'REF: (' + this.collectionOne
      + '.' + this.fieldOne + ' ';
    if (this.type === ReferenceType.oneToOne) { str += '-'; }
    if (this.type === ReferenceType.oneToMany) { str += '<'; }
    if (this.type === ReferenceType.manyToMany) { str += '><'; }
    str += ' ' + this.collectionTwo + '.' + this.fieldTwo + ')\n\n';
    return str;
  }
}
