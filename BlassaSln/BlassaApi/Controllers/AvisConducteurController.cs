using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Models;
using BlassaApi.Dto;

namespace BlassaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvisConducteurController : Controller
    {
        private readonly BlassaContext _dbContext;

        public AvisConducteurController(BlassaContext dbContext)
        {
            _dbContext = dbContext;
        }

        //GET : api/Avis/User/Stat/5
        [HttpGet("User/Stat/{userId}")]
        public async Task<ActionResult<AviDto>> GetAviUserStat(int userId)
        {
            var aviStat = new AviDto();
            if (_dbContext.AvisConducteur == null)
                return Ok(aviStat);

            var qureyAviStat = from av in _dbContext.AvisConducteur
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
                    case CategorieAvisCommentaireType.EXCELLENT:
                        aviStat.NbreExcellent = r.Nbre;
                        break;
                    case CategorieAvisCommentaireType.BIEN:
                        aviStat.NbreBien = r.Nbre;
                        break;
                    case CategorieAvisCommentaireType.CORRECT:
                        aviStat.NbreCorrect = r.Nbre;
                        break;
                    case CategorieAvisCommentaireType.DECEVANT:
                        aviStat.NbreDecevant = r.Nbre;
                        break;
                    case CategorieAvisCommentaireType.TRES_DECEVANT:
                        aviStat.NbreTreDecevant = r.Nbre;
                        break;
                }
            }

            if (nbreTotal > 0)
            {
                var maxScore = ((int)CategorieAvisCommentaireType.EXCELLENT) * nbreTotal;
                aviStat.Rating = ((float)aviStat.Score * 5) / (float)maxScore;
            }


            return Ok(aviStat);
        }

        //GET : api/AvisConducteur/User
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<AviConducteur>>> GetAvisConducteurUser(int userId)
        {
            if (_dbContext.Avis == null)
                return NotFound();

            return await _dbContext.AvisConducteur
                .Include(x => x.UserAvi)
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        //GET : api/AvisConducteur/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AviConducteur>> GetAviConducteur(int id)
        {
            if (_dbContext.AvisConducteur == null)
                return NotFound();

            var avi = await _dbContext.AvisConducteur
                .Include(x => x.UserAvi)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (avi == null)
                return NotFound();

            return Ok(avi);
        }

        //POST : api/AvisConducteur
        [HttpPost]
        public async Task<ActionResult<AviConducteur>> PostAviConducteur(AviConducteur avi)
        {
            if (!UserExists(avi.UserId))
                return BadRequest();
            if (!UserExists(avi.UserAviId))
                return BadRequest();

            avi.DateAvi = DateTime.Now;

            _dbContext.AvisConducteur.Add(avi);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAviConducteur), new { id = avi.Id }, avi);
        }

        //PUT : api/AvisConducteur/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAvi(int id, AviConducteur avi)
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
                if (!AviConducteurExists(id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        //DELETE : api/AvisConducteur/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAviConducteur(int id)
        {
            if (_dbContext.AvisConducteur == null)
                return NotFound();

            var avi = await _dbContext.AvisConducteur.FindAsync(id);
            if (avi == null)
                return NotFound();

            _dbContext.AvisConducteur.Remove(avi);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_dbContext.Users?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        private bool AviConducteurExists(int id)
        {
            return (_dbContext.AvisConducteur?.Any(u => u.Id == id)).GetValueOrDefault();
        }
    }
}
