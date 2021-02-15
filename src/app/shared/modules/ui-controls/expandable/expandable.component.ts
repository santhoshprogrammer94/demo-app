import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
