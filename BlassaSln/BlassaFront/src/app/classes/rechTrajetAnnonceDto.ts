import { VoyageAvecType } from "./voyageAvecType";

export class RechTrajetAnnonceDto {
  id: bigint;
  depart: string;
  destination: string;
  dateHeureDepart: Date;
  prix: bigint;
  nombrePlaces: bigint;
  nombrePlacesDispo: bigint;
  voyageAvec: VoyageAvecType;
  instantane: boolean;
  vClimatise: boolean;
  userId: bigint;
  uImgUrl: string;
  uId: string;
  uNom: string;
  uPrenom: string;
  uSexe: string;
  uSuperDriver: boolean;
  uVerifie: boolean;
}
