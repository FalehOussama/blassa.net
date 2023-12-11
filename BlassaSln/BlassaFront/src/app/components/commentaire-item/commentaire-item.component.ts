import { Component, Input, OnInit } from '@angular/core';
import { CommentaireDto } from '../../classes/commentaireDto';

@Component({
  selector: 'app-commentaire-item',
  templateUrl: './commentaire-item.component.html',
  styleUrls: ['./commentaire-item.component.scss'],
})
export class CommentaireItemComponent  implements OnInit {

  @Input() comm: CommentaireDto;

  constructor() { }

  ngOnInit() { }

  toHtml(texte: string) {
    return texte.replaceAll('\n', "<br/>");
  }

}
