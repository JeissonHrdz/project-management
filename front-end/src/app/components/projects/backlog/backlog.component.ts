import { Component, HostListener, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowTurnDownRight, heroEllipsisHorizontal, heroPlus, heroTrash, heroPencilSquare } from '@ng-icons/heroicons/outline';
import { heroTrashSolid } from '@ng-icons/heroicons/solid';
import $ from 'jquery';
import { BacklogService } from '../../../services/backlog.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BacklogItem } from '../../../core/model/entity/backlog-item.model';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-backlog',
  imports: [NgIcon, ReactiveFormsModule, CommonModule],
  providers: [provideIcons({ heroArrowTurnDownRight, heroEllipsisHorizontal, heroPlus, heroTrash, heroPencilSquare, heroTrashSolid })],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css'
})
export class BacklogComponent {


  private destroy$ = new Subject<void>();
  private backlogService = inject(BacklogService)
  private toastService = inject(ToastService) 

  formEpic: FormGroup | any;
  formStory: FormGroup | any;
  formStoryUpdate: FormGroup | any;
  formEpicUpdate: FormGroup | any; 
 

  epics: BacklogItem[] = [];
  stories: BacklogItem[] = [];
  epicIdToDelete = signal(0)
  storyIdToDelete = signal(0);
  openedMenuId: string | null = null;
  


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
      priority: ['', [Validators.required]],
      epic_id: ['', [Validators.required]],
      type: ['USER_STORY']
    })
    this.formStoryUpdate = this.form.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      epic_id: [0, [Validators.required]],
      priority: [0, [Validators.required]]
    })
  }

  ngOnInit() {
    this.backlogService.getEpics(2).pipe(
      takeUntil(this.destroy$))
      .subscribe(data => {
        this.epics = data.object;
        console.log(this.epics);
      })
      this.getAllStorysByProject();
  }

  getAllStorysByProject() {
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

   updateStory(storyId: number) {    
    const projectId = 2
    this.backlogService.updateEpic(this.formStoryUpdate.value, storyId, projectId).subscribe({
      next: (response) => {
           console.log(response);
        this.stories = this.stories.map(story => {
          if (story.item_id === storyId) {
            return response.object;
          }
          return story;
        });
        this.toastService.toast('Story updated successfully', 'success');
        this.showModalEditStory(0);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  modalConfirmDeleteEpic(epicId: number) {   
    this.epicIdToDelete.set(epicId);
    $("#modal-delete-epic").toggle("fast");
  }

  deleteEpic(epicId: number) {  
    this.backlogService.deleteEpic(epicId).subscribe({
      next: (response) => {
        this.getAllStorysByProject()
        this.epics = this.epics.filter(epic => epic.item_id !== epicId);
        this.toastService.toast('Epic deleted successfully', 'success');
        this.stories = this.stories.filter(story => story.epic_id !== epicId); 
        this.modalConfirmDeleteEpic(0);      
       
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteStory(storyId: number) {
    this.backlogService.deleteStory(storyId).subscribe({
      next: (response) => {
        this.stories = this.stories.filter(story => story.item_id !== storyId);
        this.toastService.toast('Story deleted successfully', 'success');
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

  showFormEpic() {
    $("#form-epic").animate({ height: "toggle" }, "fast");
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

  showModalEditStory(storyId: number) {
   
     $("#modal-edit-story").toggle('fast');   
      this.storyIdToDelete.set(storyId);
    const storyToEdit = this.stories.find(story => story.item_id === storyId);
    if (storyToEdit) {
      this.formStoryUpdate.patchValue({
        title: storyToEdit.title,
        description: storyToEdit.description,
        epic_id: storyToEdit.epic_id,
        priority: storyToEdit.priority
      }); 
  }
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
