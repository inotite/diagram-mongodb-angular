import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { EditorService } from '../../../services/editor.service';

@Component({
  selector: 'app-codeeditor',
  templateUrl: 'codeeditor.component.html',
  styleUrls: ['codeeditor.component.less']
})
export class CodeEditorComponent implements OnInit {
  public code = '';
  constructor(
    private el: ElementRef,
    public projectsService: ProjectsService,
    public editorService: EditorService
  ) { }
  editorChange() {
  }
  ngOnInit() {
    /*this.structureService.structures.forEach(s => {
      this.code += 'Table ' + s.name + ' {\n';
      const lenght = s.fields.length - 1;
      s.fields.forEach((f, index) => {
        this.code += f.fieldPath.split('.').pop();
        this.code += ' ' + f.fieldType;
        if (index <= lenght - 1) this.code += ',';
        this.code += '\n';
      });
      this.code += '} \n\n';
      this.code = this.toUnicode(this.code);
    });*/
  }
  toUnicode(str) {
    return str.split('').map((value) => {
      const temp = value.charCodeAt(0).toString(16).toUpperCase();
      if (temp.length > 2) {
        return '\\u' + temp;
      }
      return value;
    }).join('');
  }
}
