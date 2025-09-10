import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import $ from 'jquery';
import { heroPaperAirplane, heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { CommentService } from '../../../../services/comment.service';
import { AuthServiceService } from '../../../../services/auth-service.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../../core/model/entity/comment.model';
import { CommentReadDTO } from '../../../../core/model/dto/comment-read-dto';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../core/model/entity/user.model';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-comments',
  imports: [NgIcon, ReactiveFormsModule, FormsModule, CommonModule],
  providers: [provideIcons({ heroPaperAirplane, heroPencilSquare, heroTrash })],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private commentService = inject(CommentService);
  private authService = inject(AuthServiceService)
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  
  commentForm!: FormGroup;
  comments: CommentReadDTO[] = [];
  commentsDate = new Map<number, string>();
  user = new Map<string, User>();
  showOptions: boolean = false;
  showEditComment = new Map<number, boolean>();
  userUUID:string = this.authService.getIdfromToken();

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
        this.comments.unshift(response.object);
        this.commentsDate.set(response.object.comment_id, this.dateFormatCountingDaysAgo(new Date().getTime()));
        this.getUserById(response.object.user_id);
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
        this.commentsDate = new Map<number, string>();
        this.comments.forEach(comment => {
          this.commentsDate.set(comment.comment_id, this.dateFormatCountingDaysAgo(Number(comment.created_at)));
          this.getUserById(comment.user_id);
          this.showEditComment.set(comment.comment_id, false);
        });
        
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  updateComment(comment_id: number){
    const data = {
      content: $("#edit-comment-" + comment_id).val(),
      comment_id: comment_id,    
    }
    this.commentService.updateComment(data).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.comments.forEach(comment => {
          if(comment.comment_id == comment_id){
            comment.content = response.object.content;
            comment.is_edited = true;            
          }
          this.showEditComment.set(comment_id, false);
          $("#comment-" + comment_id).removeClass("hidden");
          this.toastService.toast("Comment updated successfully", "success");
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteComment(comment_id: number){
    this.commentService.deleteComment(comment_id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.comments = this.comments.filter(comment => comment.comment_id != comment_id);
        this.toastService.toast("Comment deleted successfully", "success");
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
 
  showOptionsComment( comment_id: number) {   
    $("#options-" + comment_id).removeClass("hidden");
    $("#options-" + comment_id).addClass("flex");
  }

  hideOptionsComment( comment_id: number) {   
    $("#options-" + comment_id).removeClass("flex");
    $("#options-" + comment_id).addClass("hidden");
  }

  openEditCommentBox(comment_id: number) {
    if(this.showEditComment.get(comment_id) == true){
      $("#comment-" + comment_id).removeClass("hidden");
      this.showEditComment.set(comment_id, false);
    }else{
      this.showEditComment.set(comment_id, true);
      $("#comment-" + comment_id).addClass("hidden");      
    }
  }

  getUserById(id: string) {
    this.userService.getUserById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.user.set(response.object.user_id, response.object);
        console.log(this.user);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  

  dateFormatCountingDaysAgo(timestamp: number) {
    this.debugCommentTime(timestamp);

    const now = new Date().getTime();
    const diff = now - Number(timestamp); // En milisegundos

    if (diff < 0) return "En el futuro"; // Prevención si el servidor está adelantado

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `Hace ${seconds} segundo${seconds !== 1 ? "s" : ""}`;
    if (seconds === 0) return "Hace un momento";
    if (minutes < 60) return `Hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    if (hours < 24) return `Hace ${hours} hora${hours !== 1 ? "s" : ""}`;
    if (days < 30) return `Hace ${days} día${days !== 1 ? "s" : ""}`;
    if (months < 12) return `Hace ${months} mes${months !== 1 ? "es" : ""}`;
    return `Hace ${years} año${years !== 1 ? "s" : ""}`;


  }


  debugCommentTime(timestamp: number) {
    // Convierte el timestamp a fecha local
    const commentDate = new Date(timestamp);
    const now = new Date();

    console.log("Timestamp recibido:", timestamp);
    console.log("Fecha local del comentario:", commentDate.toString());
    console.log("Fecha local actual:", now.toString());

    // Ahora calculamos "hace cuánto"
    const diff = now.getTime() - commentDate.getTime();

    if (diff < 0) {
      console.log("El comentario está FECHADO EN EL FUTURO (servidor adelantado)");
      return;
    }

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let resultado = "";
    if (seconds < 60) resultado = `Hace ${seconds} segundo${seconds !== 1 ? "s" : ""}`;
    else if (minutes < 60) resultado = `Hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    else if (hours < 24) resultado = `Hace ${hours} hora${hours !== 1 ? "s" : ""}`;
    else resultado = `Hace ${days} día${days !== 1 ? "s" : ""}`;

    console.log("Resultado:", resultado);
  }

  closeModal() {
    $("#modal-comments").toggle("fast", () => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
