import { CouleurType } from "./couleurType";
import { TypeVehiculeType } from "./typeVehiculeType";
import { VoyageAvecType } from "./voyageAvecType";

export class TrajetAnnonce {
  id: bigint;
  userId: bigint;
  depart: string;
  lonDepart: number;
  latDepart: number;
  destination: string;
  lonDestination: number;
  latDestination: number;
  dateHeureDepart: Date;
  dateHeureDepartStr: string;
  prix: number;
  nombrePlaces: number;
  nombrePlacesDispo: number;
  tel: boolean;
  whatsApp: boolean;
  messenger: boolean;
  voyageAvec: VoyageAvecType;
  voyageAvecStr: string;
  cigarette: boolean;
  animaux: boolean;
  max2: boolean;
  leger: boolean;
  moyen: boolean;
  lourd: boolean;
  instantane: boolean;
  verifies: boolean;
  //Vehicule   
  VehiculeId: bigint;
  vMatricule: string;
  vModele: string;
  vMarque: string;
  vClimatise: boolean;
  vVerifie: boolean;
  vCouleur: CouleurType;
  vTypeVehicule: TypeVehiculeType;
  vMiseEnCirculation: Date; 
}
