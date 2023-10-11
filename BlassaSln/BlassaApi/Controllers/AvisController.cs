using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Models;

namespace BlassaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvisController : Controller
    {
        private readonly BlassaContext _dbContext;

        public AvisController(BlassaContext dbContext)
        {
            _dbContext = dbContext;
        }

        //GET : api/Avis/User
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<Avi>>> GetAvisUser(int userId)
        {
            if (_dbContext.Avis == null)
                return NotFound();

            return await _dbContext.Avis
                .Include(x => x.UserAvi)
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        //GET : api/Avis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Avi>> GetAvi(int id)
        {
            if (_dbContext.Avis == null)
                return NotFound();

            var avi = await _dbContext.Avis
                .Include(x => x.UserAvi)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (avi == null)
                return NotFound();

            return Ok(avi);
        }

        //POST : api/Avis
        [HttpPost]
        public async Task<ActionResult<Avi>> PostAvi(Avi avi)
        {
            if (!UserExists(avi.UserId))
                return BadRequest();
            if (!UserExists(avi.UserAviId))
                return BadRequest();

            avi.DateAvi = DateTime.Now;

            _dbContext.Avis.Add(avi);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAvi), new { id = avi.Id }, avi);
        }

        //PUT : api/Avis/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAvi(int id, Avi avi)
        {
            if (id != avi.Id)
                return BadRequest();

            _dbContext.Entry(avi).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AviExists(id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        //DELETE : api/Avis/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvi(int id)
        {
            if (_dbContext.Commentaires == null)
                return NotFound();

            var avi = await _dbContext.Avis.FindAsync(id);
            if (avi == null)
                return NotFound();

            _dbContext.Avis.Remove(avi);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_dbContext.Users?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        private bool AviExists(int id)
        {
            return (_dbContext.Avis?.Any(u => u.Id == id)).GetValueOrDefault();
        }
    }
}
