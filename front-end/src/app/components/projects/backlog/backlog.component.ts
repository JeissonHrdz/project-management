import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowTurnDownRight, heroEllipsisHorizontal, heroPlus, heroTrash, heroPencilSquare } from '@ng-icons/heroicons/outline';
import $ from 'jquery';
import { BacklogService } from '../../../services/backlog.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BacklogItem } from '../../../core/model/entity/backlog-item.model';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-backlog',
  imports: [NgIcon, ReactiveFormsModule, CommonModule],
  providers: [provideIcons({ heroArrowTurnDownRight, heroEllipsisHorizontal, heroPlus, heroTrash, heroPencilSquare })],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css'
})
export class BacklogComponent {

  formEpic: FormGroup | any;
  formStory: FormGroup | any;
  formEpicUpdate: FormGroup | any;
  epics: BacklogItem[] = [];
  stories: BacklogItem[] = [];
  private destroy$ = new Subject<void>();
  private backlogService = inject(BacklogService)
  private toastService = inject(ToastService)


  constructor(private form: FormBuilder) {
    this.formEpic = this.form.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      project_id: [2],
      priority: [0],
      type: ['EPIC']
    })
    this.formEpicUpdate = this.form.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })

    this.formStory = this.form.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      project_id: [2],
      priority: [0],
      epic_id: ['', [Validators.required]],
      type: ['USER_STORY']
    })
  }

  ngOnInit() {
    this.backlogService.getEpics(2).pipe(
      takeUntil(this.destroy$))
      .subscribe(data => {
        this.epics = data.object;
        console.log(this.epics);
      })

    this.backlogService.getStories(2).pipe(
      takeUntil(this.destroy$))
      .subscribe(data => {
        this.stories = data.object;
        console.log(this.stories);
      })

  }

  createEpic() {
    if (this.formEpic.valid) {
      this.backlogService.createEpic(this.formEpic.value).subscribe({
        next: (response) => {
          this.epics.push(response.object);
          this.showFormEpic();
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

  createStory() {
    if (this.formStory.valid) {
      this.backlogService.createStory(this.formStory.value).subscribe({
        next: (response) => {
          this.stories.push(response.object);
          this.toastService.toast('Story created successfully', 'success');
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      this.formStory.markAllAsTouched();
      $('#title').addClass('is-invalid');
      $('#description').addClass('is-invalid');
      $('#epic_id').addClass('is-invalid');
      $('#priority').addClass('is-invalid');
    }
  }

  getEpicName(epicId: number): string {
    const epic = this.epics.find(epic => epic.item_id === epicId);
    return epic ? epic.title : '';
  }

  updateEpic(epicId: number) {

    const projectId = 2
    this.backlogService.updateEpic(this.formEpicUpdate.value, epicId, projectId).subscribe({
      next: (response) => {
        this.epics = this.epics.map(epic => {
          if (epic.item_id === epicId) {
            return response.object;
          }
          return epic;
        });
        this.toastService.toast('Epic updated successfully', 'success');
        this.showFormEditEpic(epicId);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteEpic(epicId: number) {
    this.backlogService.deleteEpic(epicId).subscribe({
      next: (response) => {
        this.epics = this.epics.filter(epic => epic.item_id !== epicId);
        this.toastService.toast('Epic deleted successfully', 'success');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  showFormEditEpic(epicid: number) {
    const epicToEdit = this.epics.find(epic => epic.item_id === epicid);

    if (epicToEdit) {
      this.formEpicUpdate.patchValue({
        title: epicToEdit.title,
        description: epicToEdit.description
      });
      const editEpic = $(".edit-epic-" + epicid);
      if (editEpic) {
        editEpic.animate({ height: "toggle" }, "fast");
      }
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

  hasErrorsStory(controlName: string, errorType: string) {
    return (
      this.formStory.get(controlName)?.hasError(errorType)
      && this.formStory.get(controlName)?.touched
    )
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
