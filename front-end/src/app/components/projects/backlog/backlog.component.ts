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
import { ProjectService } from '../../../services/project.service';

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
  private projectService = inject(ProjectService);
  projectId = 0;

  formEpic: FormGroup | any;
  formStory: FormGroup | any;
  formStoryUpdate: FormGroup | any;
  formEpicUpdate: FormGroup | any;


  epics: BacklogItem[] = [];
  stories: BacklogItem[] = [];
  savedStories: BacklogItem[] = [];
  epicIdSelected = signal(0);
  epicIdToDelete = signal(0)
  storyIdToDelete = signal(0);
  openedMenuId: string | null = null;



  constructor(private form: FormBuilder) {
    this.formEpic = this.form.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      project_id: [this.projectService._projectId() ?? 0],
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
      project_id: [this.projectService._projectId() ?? 0],
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
    this.projectId = this.projectService._projectId() ?? 0;
    if (this.projectId == 0) {
      this.projectId = parseInt(localStorage.getItem('PPIN') ?? '0');
    }
    this.backlogService.getEpics(this.projectId).pipe(
      takeUntil(this.destroy$))
      .subscribe(data => {
        this.epics = data.object;
      })
    this.getAllStorysByProject();

  }

  getAllStorysByProject() {
    this.backlogService.getStories(this.projectId).pipe(
      takeUntil(this.destroy$))
      .subscribe(data => {
        this.stories = data.object;
        this.savedStories = data.object;
      })
  }
  showStoriesByEpicSelected(epicId: number) {
    if (this.epicIdSelected() == epicId) {
      this.stories = this.savedStories;
      this.epicIdSelected.set(0);
        $(".epic-item-"+epicId).removeClass("active");
    } else {
       $(".epic-item-"+this.epicIdSelected()).removeClass("active");
      $(".epic-item-"+epicId).addClass("active");
      this.stories = this.savedStories;
      this.stories = this.stories.filter(story => story.epic_id === epicId);
      this.epicIdSelected.set(epicId);
    }

  }

  createBacklogItem(type: string) {
    const form = type === 'EPIC' ? this.formEpic : this.formStory;
    const funcSend = type === 'EPIC' ? this.backlogService.createEpic(form.value) : this.backlogService.createStory(form.value);

    if (form.valid) {
      funcSend.subscribe({
        next: (response) => {
          if (type === 'EPIC') {
            this.epics.push(response.object);
            this.toastService.toast('Epic created successfully', 'success');
            this.showFormEpic();
          } else {
            this.stories.push(response.object);
            this.savedStories.push(response.object);
            this.toastService.toast('Story created successfully', 'success');
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      form.markAllAsTouched();
      const fields = type === 'EPIC' ? ['title', 'description'] : ['title', 'description', 'epic_id', 'priority'];
      fields.forEach(field => $(`#${field}`).addClass('is-invalid'));
    }


  }

  getEpicName(epicId: number): string {
    const epic = this.epics.find(epic => epic.item_id === epicId);
    return epic ? epic.title : '';
  }


  updateItemBacklog(itemId: number, type: string) {
    const projectId = this.projectId; // Assuming you have a way to get the current project ID
    const form = type === 'EPIC' ? this.formEpicUpdate : this.formStoryUpdate;
    const functionSend = this.backlogService.updateItem(form.value, itemId, projectId)

    if (form.valid) {
      functionSend.subscribe({
        next: (response) => {
          if (type === 'EPIC') {
            this.epics = this.epics.map(epic => {
              if (epic.item_id === itemId) {
                return response.object;
              }
              return epic;
            });
            this.toastService.toast('Epic updated successfully', 'success');
            this.showFormEditEpic(itemId);
          } else {
            this.stories = this.stories.map(story => {
              if (story.item_id === itemId) {
                return response.object;
              }
              return story;
            });
            this.toastService.toast('Story updated successfully', 'success');
            this.showModalEditStory(0);
          }
        },
        error: (error) => {
          console.log(error);
        }
      })

    }

  }


  modalConfirmDeleteEpic(epicId: number) {
    this.epicIdToDelete.set(epicId);
    $("#modal-delete-epic").toggle("fast");
  }


  deleteItemBacklog(itemId: number, type: string) {
    const functionSend = type === 'EPIC' ? this.backlogService.deleteEpic(itemId) : this.backlogService.deleteStory(itemId);

    functionSend.subscribe({
      next: (response) => {
        if (type === 'EPIC') {
          this.epics = this.epics.filter(epic => epic.item_id !== itemId);
          this.stories = this.stories.filter(story => story.epic_id !== itemId);
          this.toastService.toast('Epic deleted successfully', 'success');
          this.modalConfirmDeleteEpic(0);

        } else {
          this.stories = this.stories.filter(story => story.item_id !== itemId);
          this.toastService.toast('Story deleted successfully', 'success');
        }
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
