using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Dto;
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

        //GET : api/Avis/User/Stat/5
        [HttpGet("User/Stat/{userId}")]
        public async Task<ActionResult<AviDto>> GetAviUserStat(int userId)
        {
            var aviStat = new AviDto();
            if (_dbContext.Avis == null)
                return Ok(aviStat);

            var qureyAviStat = from av in _dbContext.Avis
                               where av.UserId == userId
                               group av by av.Categorie into g
                               select new
                               {
                                   Categorie = g.Key,
                                   Nbre = g.Count()
                               };

            var results = await qureyAviStat.ToListAsync();
            int nbreTotal = 0;

            foreach (var r in results)
            {

                aviStat.Score += (int)r.Categorie * r.Nbre;
                nbreTotal += r.Nbre;
                switch (r.Categorie)
                {
                    case CategorieAvisType.EXCELLENT:
                        aviStat.NbreExcellent = r.Nbre;
                        break;
                    case CategorieAvisType.BIEN:
                        aviStat.NbreBien = r.Nbre;
                        break;
                    case CategorieAvisType.CORRECT:
                        aviStat.NbreCorrect = r.Nbre;
                        break;
                    case CategorieAvisType.DECEVANT:
                        aviStat.NbreDecevant = r.Nbre;
                        break;
                    case CategorieAvisType.TRES_DECEVANT:
                        aviStat.NbreTreDecevant = r.Nbre;
                        break;
                }
            }

            if (nbreTotal > 0)
            {
                var maxScore = ((int)CategorieAvisType.EXCELLENT) * nbreTotal;
                aviStat.Rating = ((float)aviStat.Score * 5) / (float)maxScore;
            }

            aviStat.NbreTotal = nbreTotal;

            return Ok(aviStat);
        }

        //GET : api/Avis/User/5
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
            if (AviUserExists(avi.UserId, avi.UserAviId))
                return BadRequest("Avi existe déjà");

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
            if (_dbContext.Avis == null)
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

        private bool AviUserExists(int userId, int userAviId)
        {
            return (_dbContext.Avis?
                .Any(u => u.UserId == userId &&
                            u.UserAviId == userAviId)).GetValueOrDefault();
        }
    }
}
