import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { DataTypes, Field } from '../../../models/field.model';

@Component({
  selector: 'app-plate',
  templateUrl: 'plate.component.html',
  styleUrls: ['plate.component.less']
})
export class PlateComponent implements OnInit, AfterViewInit {
  @ViewChild('plate') plate: ElementRef;
  public zindex = 0;
  private onDataChange: Subscription;
  constructor(
    public ps: ProjectsService
  ) { }

  ngOnInit() {
    this.onDataChange = this.ps.onChange.subscribe(data => {
      if (data) {
        this.setCollections();
      }
    });
  }
  ngAfterViewInit() {
  }
  setCollections() {
    if (this.ps.activeProject) {
      this.plate.nativeElement.innerHTML = '';
      const collectionGroup = d3.select(this.plate.nativeElement)
        .append('g')
        .attr('class', 'collection-group');
      this.ps.activeProject.collections.forEach((c, i) => {
        const dWidth = this.dataLevels({
          type: DataTypes.object, data: c.fields
        });
        const collection = collectionGroup.append('svg')
          .attr('class', 'collection')
          .attr('x', i * 190 + ((i > 0) ? (i + 1) * 80 : 80))
          .attr('y', Math.floor(i / 4) * 200 + 20)
          .attr('height', 32 + 29 * this.dataLength({
            type: DataTypes.object, data: c.fields
          }))
          .attr('width', 190 + 15 * dWidth);
        this.addCollectionHeader(collection, c.name);
        let dataL = 0;
        for (i = 0; i < c.fields.length; i++) {
          if (c.fields[i].type === DataTypes.object) {
            dataL = this.dataLength(c.fields[i]);
            this.addCollectionFieldContainer(
              collection,
              c.fields[i],
              i
            );
            // console.dir(dataL + c.fields[i].name);
          } else {
            // console.dir(dataL + ' ' + c.fields[i].name);
            this.addCollectionField(collection, c.fields[i], i + dataL);
          }
          // console.dir(dataL + ' ' + c.fields[i].name);
        }/*
        c.fields.forEach((f, k) => {
          if (f.type === DataTypes.object) {
            this.addCollectionFieldContainer(
              collection,
              f,
              k
            );
          } else this.addCollectionField(collection, f, k);
        })*/
      });
      this.setCollectionMovement();
      this.setFieldContainersExpand();
    }
  }
  addCollectionHeader(
    collection: any,
    text: string
  ) {
    const header = collection.append('svg')
      .attr('class', 'collection-header')
      .attr('height', 32)
      .attr('width', 190)
      .style('fill', '#316896')
      .style('cursor', 'grab');
    header.append('rect')
      .attr('height', 32)
      .attr('width', 190);
    header.append('text')
      .attr('x', 13)
      .attr('y', 16)
      .attr('dy', '4px')
      .text(text)
      .style('fill', '#ffffff');
    header.append('title')
      .text(text);
  }
  addCollectionField(
    container: d3.Selection,
    field: any,
    k: number,
    x: number = 1
  ) {
    const f = container.append('svg')
      .attr('class', 'field')
      .attr('x', (x - 1) * 15)
      .attr('y', 32 + k * 29)
      .attr('width', 190)
      .attr('height', 29)
      .style('fill', '#efefef');
    f.append('rect')
      .attr('width', 190)
      .attr('height', 29);
    f.append('text')
      .attr('x', 13)
      .attr('y', 16)
      .attr('dy', '4px')
      .text(field.name)
      .style('fill', '#555555');
    f.append('text')
      .attr('x', 178)
      .attr('y', 16)
      .attr('dy', '4px')
      .text(field.type + (field.array ? '[]' : ''))
      .style('fill', '#555555')
      .style('text-anchor', 'end');
    f.append('title')
      .text(field.name + ' (' + field.type + ')');
  }
  addCollectionFieldContainer(
    container: d3.Selection,
    field: Field,
    k: number,
    x: number = 1
  ) {
    const dWidth = this.dataLevels(field) + 1;
    const count = this.dataLength(field) + 1;
    const f = container.append('svg')
      .attr('class', 'field field-container')
      .attr('x', (x - 1) * 15)
      .attr('y', 32 + k * 29)
      .attr('width', 190 + 15 * dWidth)
      .attr('height', count * 29)
      .style('fill', '#cccccc');
    f.append('rect')
      .attr('width', 190)
      .attr('height', 29);
    f.append('text')
      .attr('x', 13)
      .attr('y', 16)
      .attr('dy', '4px')
      .text(field.name)
      .style('fill', '#555555');
    f.append('text')
      .attr('x', 178)
      .attr('y', 16)
      .attr('dy', '4px')
      .text(field.type + (field.array ? '[]' : ''))
      .style('fill', '#555555')
      .style('text-anchor', 'end');
    f.append('title')
      .text(field.name + ' (' + field.type + ')');
    let dataL = 0;
    let dx = x >= 2 ? 2 : x + 1;
    field.data.forEach((element, index) => {
      if (element.type === DataTypes.object) {
        dataL = this.dataLength(element);
        this.addCollectionFieldContainer(
          f,
          element,
          index,
          dx
        );
      } else {
        this.addCollectionField(f, element, index + dataL, dx);
      }
    });
  }
  setCollectionMovement() {
    document.querySelectorAll('.collection-header')
      .forEach(item => {
      const header = d3.select(item);
      const parent = d3.select(item.parentNode);
      const plate = item.parentNode.parentNode.parentNode;
      item.querySelectorAll('rect, text').forEach(element => {
          element['onmousedown'] = (event) => {
            const x = event.x - Number(parent.attr('x'));
            const y = event.y - Number(parent.attr('y'));
            plate['onmousemove'] = (ev) => {
              parent
                .attr('x', ev.x - x)
                .attr('y', ev.y - y);
            };
            plate['onmouseup'] = () => {
              plate['onmousemove'] = null;
            };
          };
        });
    });
  }
  setFieldContainersExpand() {
    document.querySelectorAll('.collection .field-container')
      .forEach(container => { });
  }
  dataLength(obj: any, s = 0) {
    obj.data.forEach(o => {
      s++;
      if (o.type === DataTypes.object) {
        s += this.dataLength(o);
      }
    });
    return s;
  }
  dataLevels(obj: any, s = 0) {
    obj.data.forEach(o => {
      if (o.type === DataTypes.object) {
        s++;
        s += this.dataLevels(o);
      }
    });
    return s;
  }
}
