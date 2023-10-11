namespace BlassaApi.Models
{
    public class Preferences
    {
        public int Id { get; set; }

        public bool Passager { get; set; }

        public bool Tel { get; set; }
        public bool WhatsApp { get; set; }
        public bool Messenger { get; set; }

        public VoyageAvecType VoyageAvec { get; set; }

        public bool Cigarette { get; set; }
        public bool Animaux { get; set; }
        public bool Max2 { get; set; }
        public bool Climatise { get; set; }

        public bool Leger { get; set; }
        public bool Moyen { get; set; }
        public bool Lourd { get; set; }

        public bool Verifies { get; set; }
        public bool Instantane { get; set; }

        public int UserId { get; set; } // Required foreign key property
    }    
}
