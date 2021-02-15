import {Component, Inject, Input, OnInit} from '@angular/core';
// @ts-ignore
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  AlertType = AlertType;

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AlertDialogModel) {
  }

  ngOnInit(): void {
  }

  grantAlertClick() {
    this.dialogRef.close(true);
  }

  cancelClick() {
    this.dialogRef.close(false);
  }
}

export class AlertDialogModel {

  alertType: AlertType;
  title: string;
  message: string;
  grantButtonTitle: string;

  constructor(alertType: AlertType = AlertType.POSITIVE,
              message: string,
              grantButtonTitle: string) {

    this.alertType = alertType;
    this.message = message;
    this.grantButtonTitle = grantButtonTitle;
  }

}

export enum AlertType {
  POSITIVE,
  NEGATIVE
}
