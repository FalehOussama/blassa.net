namespace BlassaApi.Models
{
    public class Commentaire
    {
        public int Id { get; set; }
        //User qui a reçu le comm
        public int UserId { get; set; }
        public User? UserComm { get; set; } = null!;
        //User qui a posté le comm
        public int UserCommId { get; set; }
        public DateTime DateComm { get; set; }
        public string Texte { get; set; }
    }
}
