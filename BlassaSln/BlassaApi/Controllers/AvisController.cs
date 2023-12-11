using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Dto;
using BlassaApi.Models;
using System;

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

                aviStat.Score += ((int)r.Categorie + 1) * r.Nbre;
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
                var maxScore = ((int)CategorieAvisType.EXCELLENT + 1) * nbreTotal;
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

        //GET : api/Avis/User/5/1
        [HttpGet("User/{userId}/{page}")]
        public async Task<ActionResult<AvisRetourDto>> GetAvisUserPaginate(int userId, int page = 1)
        {
            if (_dbContext.Avis == null)
                return NotFound();

            var nbPageElts = 10;
            var skip = nbPageElts * (page - 1);

            var query = _dbContext.Avis
                .Where(x => x.UserId == userId);

            var retour = new AvisRetourDto();
            retour.NbreTotal = await query.CountAsync();
            retour.Avis = await query
                .Skip(skip)
                .Take(nbPageElts)
                .Select(av => new Avi() { 
                    Id = av.Id,
                    DateAvi = av.DateAvi,
                    UserId = av.UserId,
                    UserAviId = av.UserAviId,
                    Categorie = av.Categorie,
                    UserAvi = new User() { 
                        Id = av.UserAvi.Id,
                        Prenom = av.UserAvi.Prenom,
                        ImgUrl = av.UserAvi.ImgUrl,
                        SuperDriver = av.UserAvi.SuperDriver,
                        SuperUser = av.UserAvi.SuperUser,
                        Verifie = av.UserAvi.Verifie,
                    }
                })
                .OrderByDescending(x => x.DateAvi)
                .ToListAsync();

            return retour;
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
            if (avi.UserId == avi.UserAviId)
                return BadRequest("Un utilisateur ne peut pas donner un avi sur lui.");
            if (!UserExists(avi.UserId))
                return BadRequest("Utilisateur inexistant");
            if (!UserExists(avi.UserAviId))
                return BadRequest("Utilisateur avi inexistant");
            if (AviUserExists(avi.UserId, avi.UserAviId))
                return BadRequest("Avi existe déjà");

            avi.DateAvi = DateTime.Now;

            _dbContext.Avis.Add(avi);
            await _dbContext.SaveChangesAsync();

            var aviStat = await GetAviUserStat(avi.UserId);
            var user = await _dbContext.Users.FindAsync(avi.UserId);
            if (user != null)
            {
                var objAviStat = (AviDto)((ObjectResult)aviStat.Result).Value;                
                user.SuperUser = (objAviStat?.Rating >= 4);
                _dbContext.Entry(user).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }

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
                            u.UserAviId == userAviId &&
                            DateTime.Now.Year == u.DateAvi.Year &&
                            DateTime.Now.Month == u.DateAvi.Month &&
                            DateTime.Now.Day == u.DateAvi.Day)).GetValueOrDefault();
        }
    }
}
