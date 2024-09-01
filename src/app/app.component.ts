import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './user';
import { UsernameService } from './services/username.service';


@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title">Form Submitted!</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>User Name : {{ userName }}</p>
      <p>Email : {{ email }}</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="activeModal.close('Close click')">Close</button>
		</div>
	`,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);
  @Input() userName: string = '';
  @Input() email: string = '';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private service: UsernameService) { }
  title = 'user-form';
  private modalService = inject(NgbModal);
  userModel = new User('', '', '');

  // handler for submit button
  onSubmit() {
    this.service.getUserName(this.userModel).subscribe({
      next: (res) => {
        console.log(res);
        //res = {"success":"1","message":"User created successfully","data":{"email":"dharabhalala99@gmail.com","user_name":"BhaD@hiddenbrains.com"}};
        if (res.success) {
          console.log(res.data);
          const modalRef = this.modalService.open(NgbdModalContent);
          modalRef.componentInstance.email = res.data.email;
          modalRef.componentInstance.userName = res.data.user_name;
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => { console.log('Form Submitted'); }
    });
  }
}

