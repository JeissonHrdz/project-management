import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  imports: [CdkDrag, CdkDropList],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent { 

  todo = ['Get to work', 'Pick up groceries', 'Go home' ];
  progress = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail' ];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
