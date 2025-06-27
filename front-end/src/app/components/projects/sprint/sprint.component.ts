import { Component, ViewChild, ElementRef, inject, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { SprintService } from '../../../services/sprint.service';
import { ToastService } from '../../../services/toast.service';
import { Sprint } from '../../../core/model/entity/sprint.model';
import { takeUntil, Subject } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroClock, heroEllipsisHorizontal, heroPencilSquare, heroTrash, heroXCircle, 
  heroChevronUpDown,heroCheckCircle,heroExclamationTriangle, heroClipboardDocumentCheck } from '@ng-icons/heroicons/outline';
import  $ from 'jquery';

@Component({
  selector: 'app-sprint',
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  providers: [provideIcons({heroClock, heroEllipsisHorizontal, heroPencilSquare, heroTrash,
     heroChevronUpDown,heroCheckCircle,heroExclamationTriangle,heroXCircle,heroClipboardDocumentCheck})],
  templateUrl: './sprint.component.html', 
  styleUrl: './sprint.component.css'
})
export class SprintComponent {
  @ViewChild('modalCreateSprint') modalCreateSprint!: ElementRef;

  formSprint: FormGroup;
  private projectId = inject(ProjectService)._projectId();
  private sprintService = inject(SprintService);
  private toastService = inject(ToastService);

  sprints: Sprint[] = [];
  dataSprintUpdate: Sprint | any;
  openedMenuId: string | null = null;
 

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

  ngOnInit(): void {
    this.getSprints();
  }

  getSprints() {
    this.sprintService.getSprints().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.sprints = data.object;
    })
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
    console.log(this.formSprint.value);
    if (this.formSprint.valid) {
      if (Date.parse(this.formSprint.value.start_date) < Date.parse(this.formSprint.value.end_date)) {    
        const originalSprint = this.dataSprintUpdate;
        const changes: any = {};

        // Comparamos cada campo y agregamos solo los que han cambiado
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
