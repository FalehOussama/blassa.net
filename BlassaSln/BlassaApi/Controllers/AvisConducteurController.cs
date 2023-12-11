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

        //GET : api/AvisConducteur/User/5/1
        [HttpGet("User/{userId}/{page}")]
        public async Task<ActionResult<AvisConduiteRetourDto>> GetAvisUserPaginate(int userId, int page = 1)
        {
            if (_dbContext.AvisConducteur == null)
                return NotFound();

            var nbPageElts = 10;
            var skip = nbPageElts * (page - 1);

            var query = _dbContext.AvisConducteur
                .Where(x => x.UserId == userId);

            var retour = new AvisConduiteRetourDto();
            retour.NbreTotal = await query.CountAsync();
            retour.Avis = await query
                .Skip(skip)
                .Take(nbPageElts)
                .Select(av => new AviConducteur()
                {
                    Id = av.Id,
                    DateAvi = av.DateAvi,
                    UserId = av.UserId,
                    UserAviId = av.UserAviId,
                    Categorie = av.Categorie,
                    UserAvi = new User()
                    {
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
            if (avi.UserId == avi.UserAviId)
                return BadRequest("Un utiisateur ne peut pas donner un avi sur lui.");
            if (!UserExists(avi.UserId))
                return BadRequest("Utilisateur inexistant");
            if (!UserExists(avi.UserAviId))
                return BadRequest("Utilisateur avi inexistant");
            if (AviUserExists(avi.UserId, avi.UserAviId))
                return BadRequest("Avi existe déjà");

            avi.DateAvi = DateTime.Now;

            _dbContext.AvisConducteur.Add(avi);
            await _dbContext.SaveChangesAsync();

            var aviStat = await GetAviUserStat(avi.UserId);
            var user = await _dbContext.Users.FindAsync(avi.UserId);
            if (user != null)
            {
                var objAviStat = (AviDto)((ObjectResult)aviStat.Result).Value;
                user.SuperDriver = (objAviStat?.Rating >= 4);
                _dbContext.Entry(user).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(GetAviConducteur), new { id = avi.Id }, avi);
        }

        //PUT : api/AvisConducteur/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAviConducteur(int id, AviConducteur avi)
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

        private bool AviUserExists(int userId, int userAviId)
        {
            return (_dbContext.AvisConducteur?
                .Any(u => u.UserId == userId &&
                            u.UserAviId == userAviId &&
                            DateTime.Now.Year == u.DateAvi.Year &&
                            DateTime.Now.Month == u.DateAvi.Month &&
                            DateTime.Now.Day == u.DateAvi.Day)).GetValueOrDefault();
        }
    }
}
