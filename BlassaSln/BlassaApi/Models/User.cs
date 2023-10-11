namespace BlassaApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? ImgUrl { get; set; }
        public string? UId { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateNaissance { get; set; }
        public string? Email { get; set; }
        public string? Description { get; set; }
        public string? Sexe { get; set; }
        public string? Tel1 { get; set; }
        public string? Tel2 { get; set; }
        public string? NumSerieTel { get; set; }
        public string? Methode { get; set; }
        public string? Platforme { get; set; }
        public string? Marque { get; set; }
        public bool ConditionsGenerales { get; set; }
        public bool Verifie { get; set; }
        public bool SuperDriver { get; set; }
        public float NotesAvis { get; set; }

        public Preferences? Preferences { get; set; } // Reference navigation to dependent
        public ICollection<Vehicule> Vehicules { get; } = new List<Vehicule>(); // Collection navigation containing dependents
        public ICollection<TrajetAnnonce> TrajetsAnnonces { get; } = new List<TrajetAnnonce>();
        public ICollection<Reservation> Reservations { get; } = new List<Reservation>();
        public ICollection<Commentaire> Commentaires { get; } = new List<Commentaire>();
        public ICollection<Commentaire> CommentairesPost { get; } = new List<Commentaire>();
        public ICollection<Avi> Avis { get; } = new List<Avi>();
        public ICollection<Avi> AvisPost { get; } = new List<Avi>();
        public ICollection<AviConducteur> AvisConducteur { get; } = new List<AviConducteur>();
        public ICollection<AviConducteur> AvisConducteurPost { get; } = new List<AviConducteur>();

    }
}
