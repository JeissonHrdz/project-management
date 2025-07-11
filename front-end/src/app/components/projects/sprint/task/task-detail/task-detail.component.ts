import { Component, inject } from '@angular/core';
import $ from 'jquery';
import { TaskService } from '../../../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon,provideIcons } from '@ng-icons/core';
import { heroXMark,  } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-task-detail',
  imports: [ NgIcon],
  providers: [provideIcons({heroXMark})],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.getTaskDetail();
    $("#modal-task-detail").toggle("fast");
    $(".modal-container").animate({ width: '450px' }, 150);
  }

  toggleEditField(field: 'status' | 'priority' | 'type' | 'estimated-hours' | 'start-date' | 'end-date' | 'actual-hours' | 'title') {
    $(`.${field}-select`).toggle();
    $(`.${field}-span`).toggle();
  }

  closeModal() {
    $(".modal-container").animate({ width: '0px' }, 150, () => {
      $("#modal-task-detail").toggle("fast", () =>{
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    });

  }

  getTaskDetail() {
    const taskId = this.route.snapshot.queryParamMap.get('task_id');

  }
}
