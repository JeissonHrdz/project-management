import { Component, ViewChild, ElementRef, inject, HostListener, signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { SprintService } from '../../../services/sprint.service';
import { ToastService } from '../../../services/toast.service';
import { Sprint } from '../../../core/model/entity/sprint.model';
import { takeUntil, Subject, Observable, forkJoin, switchMap, tap, map, of } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroClock, heroEllipsisHorizontal, heroPencilSquare, heroTrash, heroXCircle, 
  heroChevronUpDown,heroCheckCircle,heroExclamationTriangle, heroClipboardDocumentCheck, heroPlus } from '@ng-icons/heroicons/outline';
import  $ from 'jquery';

import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../core/model/entity/task';
@Component({
  selector: 'app-sprint',
  imports: [CommonModule, ReactiveFormsModule, NgIcon,RouterOutlet],
  providers: [provideIcons({heroClock, heroEllipsisHorizontal, heroPencilSquare, heroTrash,
     heroChevronUpDown,heroCheckCircle,heroExclamationTriangle,heroXCircle,heroClipboardDocumentCheck,heroPlus})],
  templateUrl: './sprint.component.html', 
  styleUrl: './sprint.component.css'
})
export class SprintComponent {
  @ViewChild('modalCreateSprint') modalCreateSprint!: ElementRef;
  @ViewChild('createTask', {read: RouterOutlet}) createTask!: RouterOutlet;

  formSprint: FormGroup;
 
  private projectService = inject(ProjectService);
  private sprintService = inject(SprintService);
  private taskService = inject(TaskService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private projectId = this.projectService._projectId(); 

  sprints: Sprint[] = [];
  dataSprintUpdate: Sprint | any;
  openedMenuId: string | null = null;
  tasks: Task[] = [];
  

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.formSprint = this.fb.group({
      name: ['', Validators.required],
      goal: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      status: ['planned', Validators.required],
      project_id: [this.projectId, Validators.required]
    });
  }

  //Effect para actualizar la lista de tareas cuando se crean nuevas tareas
 readonly tasksEffect = effect(() => {
  this.tasks = this.taskService.tasks();
});

  ngOnInit(): void {    
    this.getSprints();  
  }


  //Funcion para obtener los sprints Y sus tareas
  getSprints() {        
  if (this.projectId == 0) {
      this.projectId = parseInt(localStorage.getItem('PPIN') ?? '0');  
     }      
    this.sprintService.getSprints(this.projectId).pipe(
      map(res => res.object),
      switchMap((sprints) => {      
        this.sprints = sprints;    
        const validSprints = sprints.filter((sprint:Sprint) => !!sprint.sprint_id); //Filtrar los sprints validos
        const tasksBySprint$ : Observable<Task[]>[] = validSprints.map((sprint:Sprint) =>  //Obtener las tareas de cada sprint
         this.taskService.tasks().length > 0 ? of([]) : this.getTasksBySprint(sprint.sprint_id)
        );        
        return forkJoin(tasksBySprint$); //Unir todas las tareas de los sprints
      }),
      takeUntil(this.destroy$)
    ).subscribe((allSprintTasks: Task[][]) => {      //Actualizar la lista de tareas
      this.tasks = this.taskService.tasks();
      });

  }

  //Funcion para obtener las tareas de un sprint
  getTasksBySprint(sprint_id: number)  {
   this.taskService.getTasksBySprint(sprint_id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {    
      this.taskService.tasks.update((tasks) => [...tasks, ...data.object]);    
      this.tasks = this.taskService.tasks();
    })   
  }

  dateFormatter(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  } 

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showModalCreateSprint(show: number, type: string, sprintId?: number) {
    
    $("#modal-create-sprint").toggle("fast");
    if (type === 'create') {
       this.dataSprintUpdate = null;
       this.formSprint.reset({
        status: 'planned',
        project_id: this.projectId
    });        
    } else {
      this.dataSprintUpdate = this.sprints.find(sprint => sprint.sprint_id === sprintId);   
      this.dataSprintUpdate.start_date = this.setFormatDate(this.dataSprintUpdate.start_date);
      this.dataSprintUpdate.end_date = this.setFormatDate(this.dataSprintUpdate.end_date);     
      this.formSprint.patchValue(this.dataSprintUpdate);
    } 
  }

  createSprint() {  
    if (this.formSprint.valid) {
      if (Date.parse(this.formSprint.value.start_date) < Date.parse(this.formSprint.value.end_date)) {    
        this.sprintService.createSprint(this.formSprint.value).subscribe({
          next: (response) => {
            this.toastService.toast('Sprint created successfully', 'success');
            this.sprints.push(response.object);
          },
          error: (error) => {
            console.log(error);
          }
        })
        this.showModalCreateSprint(0, 'create');   
        this.formSprint.reset({
          status: 'planned',
          project_id: this.projectId
      });     
      } else {
        this.toastService.toast('Start date must be less than end date', 'error');
      }
    } else {
      this.formSprint.markAllAsTouched();
      this.formSprint.updateValueAndValidity();

    } 
  }

  setFormatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  updateSprint(sprintId: number){ 

    if (this.formSprint.valid) {
      if (Date.parse(this.formSprint.value.start_date) < Date.parse(this.formSprint.value.end_date)) {    
        const originalSprint = this.dataSprintUpdate;
        const changes: any = {};
     
        Object.keys(this.formSprint.value).forEach(key => {
          if (key !== 'project_id' && this.formSprint.value[key] !== originalSprint[key]) {
            changes[key] = this.formSprint.value[key];
          }
        });
        this.sprintService.updateSprint(sprintId, changes).subscribe({
          next: (response) => {
            this.toastService.toast('Sprint updated successfully', 'success'); 
            this.sprints = this.sprints.map(sprint => sprint.sprint_id === sprintId ? response.object : sprint);
          },
          error: (error) => {
            console.log(error);
          }
        })
        this.showModalCreateSprint(0, 'create');   
        this.formSprint.reset({
          status: 'planned',
          project_id: this.projectId      
      });     
      } else {
        this.toastService.toast('Start date must be less than end date', 'error');
      }
    } else {
      this.formSprint.markAllAsTouched();
      this.formSprint.updateValueAndValidity();

    } 
  }
  modalConfirmDeleteSprint(sprintId: number){
    $("#modal-delete-sprint").toggle("fast");   
  }

  deleteSprint(sprintId: number){
    this.sprintService.deleteSprint(sprintId).subscribe({
      next: (response) => {
        this.toastService.toast('Sprint deleted successfully', 'success');
        this.sprints = this.sprints.filter(sprint => sprint.sprint_id !== sprintId);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openModalCreateTask( sprintId: number){
    this.router.navigate(['task'], {
      relativeTo: this.route,
      queryParams: {
        sprint_id: sprintId
      },
      skipLocationChange: true
    });
  }

  openModalTaskDetail(taskId: number,sprintId: number){
    this.taskService.taskSelected.set(this.taskService.tasks().find(task => task.task_id === taskId) ?? {} as Task); 
    this.router.navigate(['task-detail'], {
      relativeTo: this.route,
      queryParams: {
        task_id: taskId,
        sprint_id: sprintId
      },
      skipLocationChange: true
    });
  }

   toggleMenu(menuId: string): void {
     this.openedMenuId = this.openedMenuId === `menu-${menuId}` ? null : `${menuId}`;
   }
   closeMenu(): void {
     this.openedMenuId = null;
   }
 
   @HostListener('document:click')
   onDocumentClick(): void {
     this.closeMenu(); 
   }

  hasErrors(controlName: string, validation: string, type: string): boolean {
    const control = this.formSprint.get(controlName);
    if (!control) return false;
    return control.hasError(validation) && (control.dirty || control.touched);
  }
}
