import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.scss']
})
export class ContentDialogComponent implements OnInit {

  @Input() title = 'Title';
  @Input() okButtonTitle = 'OK';
  @Input() cancelButtonTitle = 'CANCEL';
  @Output() onOkClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancelClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  okClick() {
    this.onOkClick.emit();
  }

  cancelClick() {
    this.onCancelClick.emit();
  }
}
