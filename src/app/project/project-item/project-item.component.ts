import { Component, OnInit, Input, Output, EventEmitter, HostBinding ,HostListener} from '@angular/core';
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
  @HostBinding('@card') cardState = 'out';

  constructor() { }

  ngOnInit() {
  }
  onInvite() {
    this.invite.emit();
  }
  onEditClick() {
    this.editProject.emit();
  }
  onDeleteClick() {
    this.delete.emit();
  }
  @HostListener('mouseenter')
  onmMouseEnter(){
    this.cardState='hover';
  }
  @HostListener('mouseleave')
  onMouseLeave(){
    this.cardState='out';
  }
}
