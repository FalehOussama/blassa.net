export class CommentaireDto {
  id: number;
  userId: number;
  userCommId: number;
  dateComm: Date;
  texte: string;
  prenom: string;
  imgUrl: string;
  superDriver: boolean;
  superUser: boolean;
  verifie: boolean;
}
