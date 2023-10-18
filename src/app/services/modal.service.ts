
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();
  private modalComponent = new BehaviorSubject<any>(null);
  modalComponent$ = this.modalComponent.asObservable();

  openModal(component: any) {
    this.isOpen.next(true);
    this.modalComponent.next(component);
  }

  closeModal() {
    this.isOpen.next(false);
  }
}
