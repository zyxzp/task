import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { cardAnim } from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ]
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() invite = new EventEmitter<void>();
  @Output() editProject = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() onSelected = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';

  constructor() { }

  ngOnInit() {
  }
  onInvite(ev: Event) {
    ev.stopPropagation();
    this.invite.emit();
  }
  onEditClick(ev: Event) {
    ev.stopPropagation();
    this.editProject.emit();
  }
  onDeleteClick(ev: Event) {
    ev.stopPropagation();
    this.delete.emit();
  }
  @HostListener('mouseenter')
  onmMouseEnter() {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }
  onClick() {
    this.onSelected.emit();
  }
}
