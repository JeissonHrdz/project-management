import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowTurnDownRight, heroEllipsisHorizontal, heroPlus } from '@ng-icons/heroicons/outline';
import $ from 'jquery';
import { BacklogService } from '../../../services/backlog.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BacklogItem } from '../../../core/model/entity/backlog-item.model';

@Component({
  selector: 'app-backlog',
  imports: [NgIcon, ReactiveFormsModule, CommonModule],
  providers: [provideIcons({ heroArrowTurnDownRight, heroEllipsisHorizontal, heroPlus })],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css'
})
export class BacklogComponent {

  formEpic: FormGroup | any;
  epics: BacklogItem[] = [];
  private destroy$ = new Subject<void>();
  private backlogService = inject(BacklogService)


  constructor(private form: FormBuilder) {
    this.formEpic = this.form.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      project_id: [2],
      priority: [0],
      type: ['EPIC']
    })
  }

  ngOnInit() {
    this.backlogService.getEpics(2).pipe(
      takeUntil(this.destroy$))
      .subscribe(data => {
        this.epics = data.object;
                console.log(this.epics);

      })
  }

  createEpic() {
    if (this.formEpic.valid) {
      this.backlogService.createEpic(this.formEpic.value).subscribe({
        next: (response) => {
          this.epics.push(response.object);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      this.formEpic.markAllAsTouched();
      $('#title').addClass('is-invalid');
      $('#description').addClass('is-invalid');
    }

  }

  viewMenu(id: string): void {
    const menu = document.getElementById(id);
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  showFormEpic() {
    $("#form-epic").animate({ height: "toggle" }, "fast");
  }


  hasErrors(controlName: string, errorType: string) {
    return (
      this.formEpic.get(controlName)?.hasError(errorType)
      && this.formEpic.get(controlName)?.touched
    )
  }

}
