using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Models;

namespace BlassaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrajetsAnnoncesController : Controller
    {
        private readonly BlassaContext _dbContext;

        public TrajetsAnnoncesController(BlassaContext dbContext)
        {
            _dbContext = dbContext;
        }

        //GET : api/TrajetsAnnonces/User
        [HttpGet("/TrajetsAnnoncesUser/{userId}")]
        public async Task<ActionResult<IEnumerable<TrajetAnnonce>>> GetTrajetsAnnoncesUser(int userId)
        {
            if (_dbContext.TrajetsAnnonces == null)
            {
                return NotFound();
            }
            return await _dbContext.TrajetsAnnonces.Where(x => x.UserId == userId).ToListAsync();
        }

        //GET : api/TrajetsAnnonces/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TrajetAnnonce>> GetTrajetAnnonce(int id)
        {
            if (_dbContext.TrajetsAnnonces == null)
            {
                return NotFound();
            }

            var trajetAnnonce = await _dbContext.TrajetsAnnonces.FindAsync(id);
            if (trajetAnnonce == null)
                return NotFound();

            return Ok(trajetAnnonce);
        }

        //POST : api/TrajetAnnonce
        [HttpPost]
        public async Task<ActionResult<User>> PostTrajetAnnonce(TrajetAnnonce trajetAnnonce)
        {
            if (!UserExists(trajetAnnonce.UserId))
                return BadRequest();

            _dbContext.TrajetsAnnonces.Add(trajetAnnonce);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTrajetAnnonce), new { id = trajetAnnonce.Id }, trajetAnnonce);
        }

        //PUT : api/TrajetAnnonce/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrajetAnnonce(int id, TrajetAnnonce trajetAnnonce)
        {
            if (id != trajetAnnonce.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(trajetAnnonce).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrajetAnnonceExists(id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        //DELETE : api/TrajetAnnonce/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrajetAnnonce(int id)
        {
            if (_dbContext.TrajetsAnnonces == null)
                return NotFound();

            var trajetAnnonce = await _dbContext.TrajetsAnnonces.FindAsync(id);
            if (trajetAnnonce == null)
                return NotFound();

            _dbContext.TrajetsAnnonces.Remove(trajetAnnonce);
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
    }
}
