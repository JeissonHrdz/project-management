import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { SprintService } from '../../../services/sprint.service';
import { ToastService } from '../../../services/toast.service';
import { Sprint } from '../../../core/model/entity/sprint.model';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-sprint',
  imports: [CommonModule, ReactiveFormsModule],
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

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.formSprint = this.fb.group({
      name: ['', Validators.required],
      goal: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      status: ['', Validators.required],
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

  showModalCreateSprint(show: number) {
    $("#modal-create-sprint").toggle("fast");
  }

  createSprint() {
    if (this.formSprint.valid) {
      if (Date.parse(this.formSprint.value.start_date) < Date.parse(this.formSprint.value.end_date)) {

        this.sprintService.createSprint(this.formSprint.value).subscribe({
          next: (response) => {
            this.toastService.toast('Sprint created successfully', 'success');
          },
          error: (error) => {
            console.log(error);
          }
        })
        this.showModalCreateSprint(0);
        this.formSprint.reset();
      } else {
        this.toastService.toast('Start date must be less than end date', 'error');
      }
    } else {
      this.formSprint.markAllAsTouched();
      this.formSprint.updateValueAndValidity();

    }


  }

  hasErrors(controlName: string, validation: string, type: string): boolean {
    const control = this.formSprint.get(controlName);
    if (!control) return false;
    return control.hasError(validation) && (control.dirty || control.touched);
  }
}
