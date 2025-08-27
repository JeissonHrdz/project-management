import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIcon,provideIcons } from '@ng-icons/core';
import $ from 'jquery';
import { heroPaperAirplane } from '@ng-icons/heroicons/outline';
import { CommentService } from '../../../../services/comment.service';
import { AuthServiceService } from '../../../../services/auth-service.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../../core/model/entity/comment.model';

@Component({
  selector: 'app-comments',
  imports: [NgIcon, ReactiveFormsModule, FormsModule, CommonModule],
  providers: [provideIcons({heroPaperAirplane})],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private commentService = inject(CommentService);
  private authService = inject(AuthServiceService)
  private formBuilder = inject(FormBuilder);
  commentForm!: FormGroup;
  comments: Comment[] = [];

  private destroy$ = new Subject<void>();

  taskId: number = 0; 
  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.queryParamMap.get('task_id')) || 0;  
    this.getComments();
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required],
      task_id: [this.taskId, Validators.required],
      user_id: [this.authService.getIdfromToken() ?? "", Validators.required]
    });
  }

  sendComment() {
     const data = this.commentForm?.value; 
     this.commentService.createComment(data).pipe(
      takeUntil(this.destroy$)
     ).subscribe({
      next: (response) => {
       // this.closeModal();
       console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
     })
  }

  getComments() {
    this.commentService.getCommentsByTask(this.taskId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.comments = response.object;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  closeModal() {
    $("#modal-comments").toggle("fast", () => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
