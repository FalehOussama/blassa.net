using BlassaApi.Models;

namespace BlassaApi.Dto
{
    public class UserMembreDto
    {
        public int Id { get; set; }
        public string? ImgUrl { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public string MembreDepuis { get; set; }
        public int Age { get; set; }
        public bool Verifie { get; set; }
        public bool SuperDriver { get; set; }
        public bool SuperUser { get; set; }
        public int NbTrajetsPubliees { get; set; }
        // Preferences
        public bool Passager { get; set; }
        public bool Tel { get; set; }
        public bool WhatsApp { get; set; }
        public bool Messenger { get; set; }
        public bool Cigarette { get; set; }
        public bool Animaux { get; set; }
        public bool Max2 { get; set; }
        public bool Climatise { get; set; }
        public bool Leger { get; set; }
        public bool Moyen { get; set; }
        public bool Lourd { get; set; }
        public List<Vehicule> Vehicules { get; set; } = new List<Vehicule>();
    }
}
