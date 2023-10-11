using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Models;

namespace BlassaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiculesController : Controller
    {
        private readonly BlassaContext _dbContext;

        public VehiculesController(BlassaContext dbContext)
        {
            _dbContext = dbContext;
        }

        //GET : api/Vehicules/User
        [HttpGet("api/VehiculesUser/{userId}")]
        public async Task<ActionResult<IEnumerable<Vehicule>>> GetVehiculesUser(int userId)
        {
            if (_dbContext.Vehicules == null)
            {
                return NotFound();
            }
            return await _dbContext.Vehicules.Where(x => x.UserId == userId).ToListAsync();
        }

        //GET : api/Vehicules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicule>> GetVehicule(int id)
        {
            if (_dbContext.Vehicules == null)
            {
                return NotFound();
            }

            var vehicule = await _dbContext.Vehicules.FindAsync(id);
            if (vehicule == null)
                return NotFound();

            return Ok(vehicule);
        }

        //POST : api/Vehicules
        [HttpPost]
        public async Task<ActionResult<Vehicule>> PostVehicule(Vehicule vehicule)
        {
            if (!UserExists(vehicule.UserId))
                return BadRequest();

            if(!VehiculeCanAdd(vehicule.UserId))
                return BadRequest();

            _dbContext.Vehicules.Add(vehicule);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVehicule), new { id = vehicule.Id }, vehicule);
        }

        //PUT : api/Vehicules/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicule(int id, Vehicule vehicule)
        {
            if (id != vehicule.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(vehicule).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehiculeExists(id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        //DELETE : api/Vehicules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicule(int id)
        {
            if (_dbContext.Vehicules == null)
                return NotFound();

            var vehicule = await _dbContext.Vehicules.FindAsync(id);
            if (vehicule == null)
                return NotFound();

            _dbContext.Vehicules.Remove(vehicule);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_dbContext.Users?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        private bool VehiculeExists(int id)
        {
            return (_dbContext.Vehicules?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        private bool VehiculeCanAdd(int idUser)
        { 
            return _dbContext.Vehicules.Count(u => u.UserId == idUser) < 3;
        }
    }
}
