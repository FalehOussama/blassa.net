using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Models;

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

        //GET : api/Users/5
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

        //POST : api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            user.DateCreation = DateTime.Now;
            if (user.Preferences == null)
                user.Preferences = new Preferences();
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
    }
}
