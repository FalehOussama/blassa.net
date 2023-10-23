using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Models;

namespace BlassaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : Controller
    {
        private readonly BlassaContext _dbContext;

        public ReservationsController(BlassaContext dbContext)
        {
            _dbContext = dbContext;
        }

        //GET : api/Reservations/User
        [HttpGet("TrajetAnnonce/{trajetAnnonceId}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationsTrajetAnnonce(int trajetAnnonceId)
        {
            if (_dbContext.Reservations == null)
            {
                return NotFound();
            }
            return await _dbContext.Reservations.Where(x => x.TrajetAnnonceId == trajetAnnonceId).ToListAsync();
        }

        //GET : api/Reservations/User
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationsUser(int userId)
        {
            if (_dbContext.Reservations == null)
            {
                return NotFound();
            }
            return await _dbContext.Reservations.Where(x => x.UserId == userId).ToListAsync();
        }

        //GET : api/Reservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            if (_dbContext.Reservations == null)
            {
                return NotFound();
            }

            var reservation = await _dbContext.Reservations.FindAsync(id);
            if (reservation == null)
                return NotFound();

            return Ok(reservation);
        }

        //POST : api/Reservations
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            if (!UserExists(reservation.UserId))
                return BadRequest("User introuvable");

            var trajetAnnonce = await _dbContext.TrajetsAnnonces.FindAsync(reservation.TrajetAnnonceId);

            if (trajetAnnonce == null)
                return BadRequest("Trajet supprimée");
            if (trajetAnnonce.DateHeureDepart < DateTime.Now)
                return BadRequest("Trajet non disponible");
            if (trajetAnnonce.NombrePlacesDispo <= 0)
                return BadRequest("Plus de places disponible");

            if (ReservationUserTrajetExists(reservation.UserId, reservation.TrajetAnnonceId))
                return BadRequest("Reservation existe déjà");

            var nbreRes = await _dbContext.Reservations
                .Where(r => r.TrajetAnnonceId == reservation.TrajetAnnonceId)
                .CountAsync();

            if (nbreRes >= 10)
                return BadRequest("Limite réservations atteind");

            reservation.DateReservation = DateTime.Now;
            if (trajetAnnonce.Instantane)
                reservation.Status = ReservationStatusType.COMFIRMEE;
            else
                reservation.Status = ReservationStatusType.EN_ATTENTE;

            using (var dbContextTransaction = _dbContext.Database.BeginTransaction())
            {
                if (trajetAnnonce.Instantane) 
                {
                    trajetAnnonce.NombrePlacesDispo--;
                    _dbContext.Entry(trajetAnnonce).State = EntityState.Modified;
                }                    

                _dbContext.Reservations.Add(reservation);

                try
                {
                    await _dbContext.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    dbContextTransaction.Rollback();

                    if (!TrajetAnnonceExists(reservation.TrajetAnnonceId))
                        return NotFound("Trajet supprimée");
                    else
                        throw;
                }

                dbContextTransaction.Commit();
            }
            

            return CreatedAtAction(nameof(GetReservation), new { id = reservation.Id }, reservation);
        }

        //PUT : api/Reservations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.Id)
                return BadRequest();

            var reservationDb = await _dbContext.Reservations.FindAsync(id);
            if (reservationDb == null)
                return NotFound();

            var trajetAnnonce = await _dbContext.TrajetsAnnonces.FindAsync(reservationDb.TrajetAnnonceId);
            if (trajetAnnonce == null)
                return NotFound("Trajet non trouvé");
            if (trajetAnnonce.DateHeureDepart < DateTime.Now)
                return BadRequest("Trajet non disponible");

            if (reservation.Status == reservationDb.Status)
                return BadRequest("Reservation status n'a pas changé");
            if (reservation.Status == ReservationStatusType.COMFIRMEE) 
            {
                trajetAnnonce.NombrePlacesDispo--;
                if (trajetAnnonce.NombrePlacesDispo < 0)
                    return BadRequest("Plus de places disponible");
            }                
            if (reservationDb.Status == ReservationStatusType.COMFIRMEE)
                trajetAnnonce.NombrePlacesDispo++;

            reservationDb.Status = reservation.Status;

            using (var dbContextTransaction = _dbContext.Database.BeginTransaction())
            {
                _dbContext.Entry(trajetAnnonce).State = EntityState.Modified;
                _dbContext.Entry(reservationDb).State = EntityState.Modified;

                try
                {
                    await _dbContext.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    dbContextTransaction.Rollback();

                    if (!ReservationExists(id))
                        return NotFound("Reservation supprimée");
                    else if (!TrajetAnnonceExists(reservation.TrajetAnnonceId))
                        return NotFound("TrajetAnnonce supprimée");
                    else
                        throw;
                }

                dbContextTransaction.Commit();
            }
            
            return NoContent();
        }

        //DELETE : api/Reservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            if (_dbContext.Reservations == null)
                return NotFound();

            var reservation = await _dbContext.Reservations.FindAsync(id);
            if (reservation == null)
                return NotFound();

            _dbContext.Reservations.Remove(reservation);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_dbContext.Users?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        private bool TrajetAnnonceExists(int id)
        {
            return (_dbContext.TrajetsAnnonces?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        private bool ReservationExists(int id)
        {
            return (_dbContext.Reservations?.Any(u => u.Id == id)).GetValueOrDefault();
        }
        private bool ReservationUserTrajetExists(int userId, int trajetAnnonceId)
        {
            return (_dbContext.Reservations?
                .Any(u => u.UserId == userId && 
                            u.TrajetAnnonceId == trajetAnnonceId))
                            .GetValueOrDefault();
        }
    }
}
