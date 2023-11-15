import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

enum COLORS{
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss'],
})
export class RatingModalComponent  implements OnInit {

  constructor(
    private storage : StorageService,
    private userService : UserService,
  ) { }

  membre:any;
  @Input() ratingAvis: number ;
  @Input() ratingConduite: number ;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  async ionViewWillEnter(){
    await this.storage.get('membre').then(
      async data => {
        this.membre = await data;
      }
    )
  }

  ngOnInit() {}

  @Input() noteAvis : number;
  @Input() noteConduite : number;

  rateAvis(index: number) {
    this.ratingAvis=index;
    this.ratingChange.emit(this.ratingAvis)
    console.log(index)
    this.noteAvis = index;
  }

  rateConduite(index: number) {
    this.ratingConduite=index;
    this.ratingChange.emit(this.ratingConduite)
    console.log(index)
    this.noteConduite = index;
  }

  submitNoteAvis(){
    //this.userService.noterAvisUser(this.membre.id_User , this.noteAvis).subscribe(
    //  ()=> console.log("Noté")
    //)
  }

  submitNoteConduite(){
    //this.userService.noterConduiteUser(this.membre.id_User , this.noteConduite).subscribe(
    //  ()=> console.log("Conduite Notée")
    //)
  }

 getColorAvis(index: number) {
  if(this.isAboveRatingAvis(index)){
    return COLORS.GREY;
  }
  switch (this.ratingAvis){
    case 1 :
    case 2 :
      return COLORS.RED;
    case 3 :
      return COLORS.YELLOW;
    case 4 :
    case 5 :
      return COLORS.GREEN;
    default :
      return COLORS.GREY;
  }
}

getColorConduite(index: number) {
  if(this.isAboveRatingConduite(index)){
    return COLORS.GREY;
  }
  switch (this.ratingConduite){
    case 1 :
    case 2 :
      return COLORS.RED;
    case 3 :
      return COLORS.YELLOW;
    case 4 :
    case 5 :
      return COLORS.GREEN;
    default :
      return COLORS.GREY;
  }
}

isAboveRatingAvis(index: number): boolean {
  return index > this.ratingAvis
}
isAboveRatingConduite(index: number): boolean {
  return index > this.ratingConduite
}

}
