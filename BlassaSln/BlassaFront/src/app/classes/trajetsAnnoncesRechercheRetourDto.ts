import { RechTrajetAnnonceDto } from "./rechTrajetAnnonceDto";

export class TrajetsAnnoncesRechercheRetourDto {
  trajets: Array<RechTrajetAnnonceDto>;
  count: number;
  nbreAvant6H: bigint;
  nbreEntre6H12H: bigint;
  nbreEntre12H18H: bigint;
  nbreApres18H: bigint;
  nbreSuperDriver: bigint;
  nbreProfilVerifie: bigint;
  nbreMax2Arriere: bigint;
  nbreReservationInst: bigint;
  nbreBLeger: bigint;
  nbreBMoyen: bigint;
  nbreBLourd: bigint;
  nbreClimatisation: bigint;
  nbreCigaretteAuto: bigint;
  nbreAnimauxAuto: bigint;
  nbreVoyageAvecTous: bigint;
  nbreVoyageAvecFilles: bigint;
  nbreVoyageAvecGarcons: bigint;
}
