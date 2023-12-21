namespace BlassaApi.Models
{
    public class Vehicule
    {
        public int Id { get; set; }
        public string Matricule { get; set; }
        public string Modele { get; set; }
        public string Marque { get; set; }
        public bool Climatise { get; set; }
        public bool Verifie { get; set; }
        public CouleurType Couleur { get; set; }
        public TypeVehiculeType TypeVehicule { get; set; }
        public DateTime? MiseEnCirculation { get; set; }
        public DateTime? DateAssurance { get; set; }
        public DateTime? DateAssuranceProch { get; set; }
        public DateTime? DateVisiteTech { get; set; }
        public DateTime? DateVisiteTechProch { get; set; }
        public byte[]? FileCarteGrise { get; set; }
        public byte[]? FileAssurance { get; set; }
        public byte[]? FileVisiteTech { get; set; }
        public byte[]? Image1 { get; set; }
        public byte[]? Image2 { get; set; }
        public byte[]? Image3 { get; set; }
        public int UserId { get; set; } // Required foreign key property
    }
}
