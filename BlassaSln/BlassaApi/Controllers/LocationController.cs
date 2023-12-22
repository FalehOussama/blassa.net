using BlassaApi.Dto;
using BlassaApi.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BlassaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : Controller
    {
        private static List<Location>? _LocationsTn = null;
        private readonly BlassaContext _dbContext;

        public LocationController(BlassaContext dbContext)
        {
            _dbContext = dbContext;
        }

        //GET : api/Location/tn/5
        [HttpGet("{codePays}/{city}")]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocation(string codePays, string city)
        {
            List<Location> locations = new List<Location>();
            if (codePays.ToUpper() == "TN")
            {
                this.LoadLocationTn();
                locations = _LocationsTn
                    .Where(l => l.City != null && l.City.ToUpper().Contains(city.ToUpper()))
                    .OrderBy(l => l.City)
                    .ToList();
            }

            return locations;
        }

        //GET : api/Location/Dep/tn/5
        [HttpGet("Dep/{codePays}/{city}")]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocationDep(string codePays, string city)
        {
            if (_dbContext.TrajetsAnnonces == null)
                return NotFound();

            return _dbContext.TrajetsAnnonces
                .Where(t => t.DateHeureDepart >= DateTime.Now &&
                            t.Depart.ToUpper().Contains(city))
                .OrderBy(t => t.Depart)
                .Select(t => new Location()
                {
                    City = t.Depart,
                })
                .Distinct()
                .ToList();
        }

        //GET : api/Location/Dep/tn/5
        [HttpGet("Dest/{codePays}/{city}")]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocationDest(string codePays, string city)
        {
            if (_dbContext.TrajetsAnnonces == null)
                return NotFound();

            return _dbContext.TrajetsAnnonces
                .Where(t => t.DateHeureDepart >= DateTime.Now &&
                            t.Destination.ToUpper().Contains(city))
                .OrderBy(t => t.Destination)
                .Select(t => new Location()
                {
                    City = t.Destination,
                })
                .Distinct()
                .ToList();
        }

        private void LoadLocationTn() {
            if (_LocationsTn == null)
            {
                using (StreamReader r = new StreamReader("./Data/Location/tn.json"))
                {
                    string json = r.ReadToEnd();
                    _LocationsTn = JsonConvert.DeserializeObject<List<Location>>(json);
                }
            }
        }
    }
}
