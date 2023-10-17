import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button2',
  templateUrl: './icon-button2.component.html',
  styleUrls: ['./icon-button2.component.scss'],
})
export class IconButton2Component {
  @Input() label: string;
  @Input() icon: string;
}
