import { CouleurType } from "./couleurType";
import { TypeVehiculeType } from "./typeVehiculeType";

export class Vehicule {
  id: bigint;
  matricule: string;
  marque: string;
  modele: string;
  climatise: boolean;
  verifie: boolean;
  miseEnCirculation: Date;
  couleur: CouleurType;
  typeVehicule: TypeVehiculeType;
  userId: bigint;
}
