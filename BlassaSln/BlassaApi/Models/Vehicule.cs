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
        public int UserId { get; set; } // Required foreign key property
    }

    public enum CouleurType
    {
        Noir,
        Blanc,
        Gris_Fonce,
        Gris,
        Bordeaux,
        Rouge,
        Bleu_Fonce,
        Bleu,
        Vert_Foncé,
        Vert,
        Marron,
        Beige,
        Orange,
        Jaune,
        Violet,
        Rose
    }

    public enum TypeVehiculeType
    {
        Compacte,
        Berline,
        Cabriolet,
        Break,
        Suv,
        Monospace
    }
}
