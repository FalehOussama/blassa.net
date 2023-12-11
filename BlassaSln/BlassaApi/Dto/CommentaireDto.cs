namespace BlassaApi.Dto
{
    public class CommentaireDto
    {
        public int Id { get; set; }
        //User qui a reçu le comm
        public int UserId { get; set; }
        //User qui a posté le comm
        public int UserCommId { get; set; }
        public string? ImgUrl { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public bool Verifie { get; set; }
        public bool SuperDriver { get; set; }
        public bool SuperUser { get; set; }
        public DateTime DateComm { get; set; }
        public string Texte { get; set; }
    }
}
