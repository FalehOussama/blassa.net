namespace BlassaApi.Models
{
    public class TrajetAnnonce
    {
        public int Id { get; set; }
        public int UserId { get; set; } // Required foreign key property

        public string Depart { get; set; }
        public float LonDepart { get; set; }
        public float LatDepart { get; set; }

        public string Destination { get; set; }
        public float LonDestination { get; set; }
        public float LatDestination { get; set; }

        public DateTime DateHeureDepart { get; set; }
        public int Prix { get; set; }
        public int NombrePlaces { get; set; }

        public bool Tel { get; set; }
        public bool WhatsApp { get; set; }
        public bool Messenger { get; set; }

        public VoyageAvecType VoyageAvec { get; set; }

        public bool Cigarette { get; set; }
        public bool Animaux { get; set; }
        public bool Max2 { get; set; }

        public bool Leger { get; set; }
        public bool Moyen { get; set; }
        public bool Lourd { get; set; }

        public bool Verifies { get; set; }
        public bool Instantane { get; set; }

        //Vehicule
        public string VMatricule { get; set; }
        public string VModele { get; set; }
        public string VMarque { get; set; }
        public bool VClimatise { get; set; }
        public bool VVerifie { get; set; }
        public CouleurType VCouleur { get; set; }
        public TypeVehiculeType VTypeVehicule { get; set; }
        public DateTime? VMiseEnCirculation { get; set; }

        public DateTime DateCreation { get; set; }
    }
}
