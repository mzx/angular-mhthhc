import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notree';
  mockData = [{
    id: '0.52pm7k1ldug',
    widget: 'group',
    value: 'AND',
    children: [
      {
        id: '1.52pm7k1ldug',
        widget: 'group',
        value: 'AND',
        children: [
          {widget: 'plus_placeholder', parentId: '1.52pm7k1ldug', id: '1.tuppd06ki2o'}
        ]
      },
      {widget: 'plus_placeholder', parentId: '0.52pm7k1ldug', id: '0.tuppd06ki2o'}
    ]
  }, {widget: 'plus_placeholder', parentId: null, id: '123678123'}];

}
