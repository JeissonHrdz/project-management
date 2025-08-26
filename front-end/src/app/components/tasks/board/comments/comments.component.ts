import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIcon,provideIcons } from '@ng-icons/core';
import $ from 'jquery';
import { heroPaperAirplane } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-comments',
  imports: [NgIcon],
  providers: [provideIcons({heroPaperAirplane})],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);


  closeModal() {
    $("#modal-comments").toggle("fast", () => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
