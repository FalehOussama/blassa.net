using BlassaApi.Models;

namespace BlassaApi.Dto
{
    public class RechTrajetAnnonceDto
    {
        public int Id { get; set; }
        public string Depart { get; set; }
        public string Destination { get; set; }
        public DateTime DateHeureDepart { get; set; }
        public int Prix { get; set; }
        public int NombrePlaces { get; set; }
        public int NombrePlacesDispo { get; set; }
        public VoyageAvecType VoyageAvec { get; set; }
        public bool Instantane { get; set; }
        public string? VModele { get; set; }
        public string? VMarque { get; set; }
        public bool VClimatise { get; set; }
        public CouleurType VCouleur { get; set; }
        public TypeVehiculeType VTypeVehicule { get; set; }
        public bool VVerifie { get; set; }
        public byte[]? VImage1 { get; set; }
        public bool Cigarette { get; set; }
        public bool Animaux { get; set; }
        public bool Max2 { get; set; }

        public bool Leger { get; set; }
        public bool Moyen { get; set; }
        public bool Lourd { get; set; }
        //User
        public int UserId { get; set; }
        public string? UImgUrl { get; set; }
        public string? UId { get; set; }
        public string? UNom { get; set; }
        public string? UPrenom { get; set; }
        public string? USexe { get; set; }
        public bool USuperDriver { get; set; }
        public bool USuperUser { get; set; }
        public bool UVerifie { get; set; }

        public bool IsRes { get; set; }
        public ReservationStatusType StatutRes { get; set; }
    }
}
