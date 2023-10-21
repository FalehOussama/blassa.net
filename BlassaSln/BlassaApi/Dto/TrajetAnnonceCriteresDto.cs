using BlassaApi.Models;

namespace BlassaApi.Dto
{
    public class TrajetAnnonceCriteresDto
    {
        public string? Depart { get; set; }
        public string? Destination { get; set; }
        public DateTime DateDepart { get; set; }
        public int NombrePlaces { get; set; }
        public HeureDepartCritereTypeDto HeureDepart { get; set; }
        public bool SuperDriver { get; set; }
        public bool SuperUser { get; set; }
        public bool ProfilVerifie { get; set; }
        public bool Max2Arriere { get; set; }
        public bool ReservationInst { get; set; }
        public bool BLeger { get; set; }
        public bool BMoyen { get; set; }
        public bool BLourd { get; set; }
        public bool Climatisation { get; set; }
        public bool CigaretteAutorisee { get; set; }
        public bool AnimauxAutorises { get; set; }
        public VoyageAvecType? VoyageAvec { get; set; }
    }

    public enum HeureDepartCritereTypeDto
    {
        TOUS,
        AVANT_6H,
        ENTRE_6H_12H,
        ENTRE_12H_18H,
        APRES_18H
    }

    public enum TrajetAnnonceTriTypeDto
    {
        DEPART_PLUS_TOT,
        PRIX_PLUS_BAS,
        PROCHE_POINT_DEPART,
        PROCHE_POINT_ARRIVE
    }
}
