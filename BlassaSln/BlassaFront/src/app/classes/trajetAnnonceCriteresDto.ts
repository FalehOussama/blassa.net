import { HeureDepartCritereTypeDto } from "./heureDepartCritereTypeDto";
import { VoyageAvecType } from "./voyageAvecType";

export class TrajetAnnonceCriteresDto {
  depart: string;
  destination: string;
  dateDepart: Date;
  nombrePlaces: bigint;
  heureDepart: HeureDepartCritereTypeDto;

  superDriver: boolean;
  superUser: boolean;
  profilVerifie: boolean;
  max2Arriere: boolean;
  reservationInst: boolean;
  bLeger: boolean;
  bMoyen: boolean;
  bLourd: boolean;
  climatisation: boolean;
  cigaretteAutorisee: boolean;
  animauxAutorises: boolean;  
  
  voyageAvec?: VoyageAvecType;
}
