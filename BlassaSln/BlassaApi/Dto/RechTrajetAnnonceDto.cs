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
        public bool VClimatise { get; set; }
        //User
        public int UserId { get; set; }
        public string? UImgUrl { get; set; }
        public string? UId { get; set; }
        public string? UNom { get; set; }
        public string? UPrenom { get; set; }
        public string? USexe { get; set; }
        public bool USuperDriver { get; set; }
        public bool UVerifie { get; set; }
    }
}
