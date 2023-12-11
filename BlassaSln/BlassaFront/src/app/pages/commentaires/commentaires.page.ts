import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { CommentaireService } from '../../services/commentaire.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.page.html',
  styleUrls: ['./commentaires.page.scss'],
})
export class CommentairesPage implements OnInit {

  user: any;
  retourComms: any;
  public count = 0;
  public itemsPerPage = 10;
  public currentPage = 1;

  constructor(private router: Router,
    private commentaireService: CommentaireService,
    private storage: StorageService) { }

  ionViewWillEnter() {
    this.storage.get('user').then(
      async (data) => {
        this.user = await data;
        this.loadCommentaires();
      }
    );
  }

  ngOnInit() {
  }

  loadCommentaires() {
    this.commentaireService.getByUserIdPaginate(this.user.id, this.currentPage).subscribe(
      async (res) => {
        this.retourComms = await res;
        this.count = this.retourComms.count;
      }
    );
  }

  //pagination
  public onChange(event): void {
    console.dir(event);
    this.currentPage = event;
    this.loadCommentaires();
  }

  toFiche(idMembre) {
    this.storage.set('idMembre', idMembre);
    this.router.navigate(['/profil-membre']);
  }

}
