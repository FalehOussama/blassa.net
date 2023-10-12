namespace BlassaApi.Models
{
    public class AviConducteur
    {
        public int Id { get; set; }
        //User qui a reçu l'avi
        public int UserId { get; set; }
        public User? UserAvi { get; set; } = null!;
        //User qui a posté l'avi
        public int UserAviId { get; set; }
        public DateTime DateAvi { get; set; }
        public CategorieAvisCommentaireType Categorie { get; set; }
    }
}
