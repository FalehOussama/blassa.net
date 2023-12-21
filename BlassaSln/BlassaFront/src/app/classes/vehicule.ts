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
  fileCarteGrise: string;
  fileAssurance: string;
  fileVisiteTech: string;
  dateAssurance: Date;
  dateAssuranceProch: Date;
  dateVisiteTech: Date;
  dateVisiteTechProch: Date;
  image1: string;
  image2: string;
  image3: string;
  image1Href: string;
}
