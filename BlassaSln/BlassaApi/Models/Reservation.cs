namespace BlassaApi.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int UserId { get; set; } // Required foreign key property
        public int TrajetAnnonceId { get; set; } // Required foreign key property
        public DateTime DateReservation { get; set; }
        public ReservationStatusType Status { get; set; }
    }

    public enum ReservationStatusType
    {
        EN_ATTENTE,
        COMFIRMEE,
        REFUSEE
    }
}
