using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Models;
using BlassaApi.Dto;
using Newtonsoft.Json;

namespace BlassaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiculesController : Controller
    {
        private const int Limit = 3;
        private static List<CarBrandModels>? _Cars = null;
        private readonly BlassaContext _dbContext;

        public VehiculesController(BlassaContext dbContext)
        {
            _dbContext = dbContext;
        }

        //GET : api/Vehicules/User
        [HttpGet("User/{userId}")]
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

        //GET : api/Vehicules/json/audi
        [HttpGet("Json/{marque}")]
        public async Task<ActionResult<IEnumerable<CarBrandModels>>> GetVehiculeMarques(string marque)
        {
            this.LoadCarsJson();
            return _Cars
                .Where(c => c.Brand != null && c.Brand.ToUpper().Contains(marque.ToUpper()))
                .OrderBy(l => l.Brand)
                .ToList();
        }

        //POST : api/Vehicules
        [HttpPost]
        public async Task<ActionResult<Vehicule>> PostVehicule(Vehicule vehicule)
        {
            if (!UserExists(vehicule.UserId))
                return BadRequest("Utilisateur inexistant");

            if(!VehiculeCanAdd(vehicule.UserId))
                return BadRequest("Limite de véhicules atteinte: " + Limit);

            if (string.IsNullOrWhiteSpace(vehicule.Marque))
                return BadRequest("Marque non définie");

            if (string.IsNullOrWhiteSpace(vehicule.Modele))
                return BadRequest("Modèle non définie");

            if (string.IsNullOrWhiteSpace(vehicule.Matricule))
                return BadRequest("Matricule non définie");

            if (vehicule.Marque.Length < 3)
                return BadRequest("Marque min 3");

            if (vehicule.Modele.Length < 3)
                return BadRequest("Modüle min 3");

            if (vehicule.Matricule.Length < 3)
                return BadRequest("Matricule min 3");

            if (vehicule.MiseEnCirculation == null)
                return BadRequest("MiseEnCirculation non définie");

            vehicule.Verifie = false;

            _dbContext.Vehicules.Add(vehicule);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVehicule), new { id = vehicule.Id }, vehicule);
        }

        //PUT : api/Vehicules/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicule(int id, Vehicule vehicule)
        {
            if (id != vehicule.Id)
                return BadRequest("id véhicule");

            if (!UserExists(vehicule.UserId))
                return BadRequest("Utilisateur inexistant");

            if (string.IsNullOrWhiteSpace(vehicule.Marque))
                return BadRequest("Marque non définie");

            if (string.IsNullOrWhiteSpace(vehicule.Modele))
                return BadRequest("Modèle non définie");

            if (string.IsNullOrWhiteSpace(vehicule.Matricule))
                return BadRequest("Matricule non définie");

            if (vehicule.Marque.Length < 3)
                return BadRequest("Marque min 3");

            if (vehicule.Modele.Length < 3)
                return BadRequest("Modüle min 3");

            if (vehicule.Matricule.Length < 3)
                return BadRequest("Matricule min 3");

            if (vehicule.MiseEnCirculation == null)
                return BadRequest("MiseEnCirculation non définie");

            _dbContext.Entry(vehicule).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehiculeExists(id))
                    return NotFound("Véhicule introuvable");
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
                return NotFound("Véhicules introuvable");

            var vehicule = await _dbContext.Vehicules.FindAsync(id);
            if (vehicule == null)
                return NotFound("Véhicule introuvable");

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
            return _dbContext.Vehicules.Count(u => u.UserId == idUser) < Limit;
        }

        private void LoadCarsJson()
        {
            if (_Cars == null)
            {
                using (StreamReader r = new StreamReader("./Data/car-list.json"))
                {
                    string json = r.ReadToEnd();
                    _Cars = JsonConvert.DeserializeObject<List<CarBrandModels>>(json);
                }
            }
        }
    }
}
