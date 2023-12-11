using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Models;
using BlassaApi.Dto;
using System.Globalization;

namespace BlassaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly BlassaContext _dbContext;

        public UsersController(BlassaContext dbContext)
        {
            _dbContext = dbContext;
        }

        //GET : api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_dbContext.Users == null)
            {
                return NotFound();
            }
            return await _dbContext.Users
                .Include(u => u.Preferences)
                .ToListAsync();
        }

        //GET : api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (_dbContext.Users == null)
            {
                return NotFound();
            }

            var user = await _dbContext.Users
                .Where(u => u.Id == id)
                .Include(u => u.Preferences)
                .FirstOrDefaultAsync();
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        //GET : api/Users/Uid/5
        [HttpGet("Uid")]
        public async Task<ActionResult<User>> GetUserByUid(string uId)
        {
            if (_dbContext.Users == null)
                return NotFound();

            var user = await _dbContext.Users
                .Where(u => u.UId == uId)
                .Include(u => u.Preferences)
                .FirstOrDefaultAsync();

            if (user == null)
                return Ok();

            return Ok(user);
        }

        //GET : api/Users/Membre/5
        [HttpGet("Membre")]
        public async Task<ActionResult<UserMembreDto>> GetUserMembre(int id)
        {
            if (_dbContext.Users == null)
                return NotFound();

            var user = await _dbContext.Users
                .Where(u => u.Id == id)
                .Include(u => u.Preferences)
                .Include(u => u.Vehicules)
                .Include(u => u.Commentaires)
                .ThenInclude(c => c.UserComm)
                .Select(u => new UserMembreDto() { 
                    Id = u.Id,
                    ImgUrl = u.ImgUrl,
                    Nom = u.Nom,
                    Prenom = u.Prenom,
                    MembreDepuis = FormatDateMounthYear(u.DateCreation),
                    Age = GetAge(u.DateNaissance),
                    Verifie = u.Verifie,
                    SuperDriver = u.SuperDriver,
                    SuperUser = u.SuperUser,
                    NbTrajetsPubliees = u.TrajetsAnnonces.Count(),
                    Passager = u.Preferences.Passager,
                    Tel = u.Preferences.Tel,
                    WhatsApp = u.Preferences.WhatsApp,
                    Messenger = u.Preferences.Messenger,
                    Cigarette = u.Preferences.Cigarette,
                    Animaux = u.Preferences.Animaux,
                    Max2 = u.Preferences.Max2,
                    Climatise = u.Preferences.Climatise,
                    Leger = u.Preferences.Leger,
                    Moyen = u.Preferences.Moyen,
                    Lourd = u.Preferences.Lourd,
                    Vehicules = u.Vehicules.ToList()
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return Ok();

            return Ok(user);
        }

        //POST : api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            user.DateCreation = DateTime.Now;
            user.Nouveau = true;
            user.Verifie = user.FilePermisConduire != null || user.FileCin != null || user.FilePasseport != null;
            user.Preferences ??= new Preferences();
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        //PUT : api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            { 
                return BadRequest();
            }

            user.Verifie = user.FilePermisConduire != null || user.FileCin != null || user.FilePasseport != null;

            _dbContext.Entry(user).State = EntityState.Modified;
            _dbContext.Entry(user.Preferences).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        //DELETE : api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_dbContext.Users == null)
                return NotFound();

            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        { 
            return (_dbContext.Users?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        private static int GetAge(DateTime? dateNaissance)
        { 
            if (dateNaissance == null)
                return 0;
            int years = (int) (DateTime.Now.Subtract(dateNaissance.Value).TotalDays / 365);
            return years;
        }

        private static string FormatDateMounthYear(DateTime? date)
        {
            if (date == null)
                return string.Empty;

            return date.Value.ToString("MMMM yyyy", new CultureInfo("fr-FR"));
        }
    }
}
