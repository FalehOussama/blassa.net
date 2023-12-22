﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Models;
using BlassaApi.Dto;

namespace BlassaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrajetsAnnoncesController : Controller
    {
        private readonly BlassaContext _dbContext;

        public TrajetsAnnoncesController(BlassaContext dbContext)
        {
            _dbContext = dbContext;
        }

        //POST : api/TrajetsAnnonces/User
        [HttpPost("Recherche")]
        public async Task<ActionResult<TrajetsAnnoncesRechercheRetourDto>> TrajetsAnnoncesRecherche(TrajetAnnonceCriteresDto criteres, TrajetAnnonceTriTypeDto tri, int pageNb)
        {
            if (pageNb <= 0)
                return BadRequest("pageNb: {pageNb} <= 0");
            var retour = new TrajetsAnnoncesRechercheRetourDto();
            if (_dbContext.TrajetsAnnonces == null)
                return retour;

            var query = _dbContext.TrajetsAnnonces.AsQueryable();

            if (!string.IsNullOrEmpty(criteres.Depart))
                query = query.Where(t => t.Depart.ToUpper().StartsWith(criteres.Depart.ToUpper()));

            if (!string.IsNullOrEmpty(criteres.Destination))
                query = query.Where(t => t.Destination.ToUpper().StartsWith(criteres.Destination.ToUpper()));

            criteres.DateDepart = new DateTime(criteres.DateDepart.Year, criteres.DateDepart.Month, criteres.DateDepart.Day, 0, 1, 0);
            query = query.Where(t => t.DateHeureDepart >= criteres.DateDepart);

            query = query.Where(t => t.NombrePlacesDispo >= criteres.NombrePlaces);

            //A vérifier
            switch (criteres.HeureDepart)
            {
                case HeureDepartCritereTypeDto.AVANT_6H:
                    query = query.Where(t => t.DateHeureDepart.Hour <= 5);
                    break;
                case HeureDepartCritereTypeDto.ENTRE_6H_12H:
                    query = query.Where(t => t.DateHeureDepart.Hour >= 6 && t.DateHeureDepart.Hour <= 11);
                    break;
                case HeureDepartCritereTypeDto.ENTRE_12H_18H:
                    query = query.Where(t => t.DateHeureDepart.Hour >= 12 && t.DateHeureDepart.Hour <= 17);
                    break;
                case HeureDepartCritereTypeDto.APRES_18H:
                    query = query.Where(t => t.DateHeureDepart.Hour >= 18);
                    break;
            }

            if (criteres.SuperDriver)
                query = query.Where(t => t.User.SuperDriver);

            if (criteres.SuperUser)
                query = query.Where(t => t.User.SuperUser);

            if (criteres.ProfilVerifie)
                query = query.Where(t => t.User.Verifie);

            if (criteres.Max2Arriere)
                query = query.Where(t => t.Max2);

            if (criteres.ReservationInst)
                query = query.Where(t => t.Instantane);

            if (criteres.BLeger)
                query = query.Where(t => t.Leger);

            if (criteres.BMoyen)
                query = query.Where(t => t.Moyen);

            if (criteres.BLourd)
                query = query.Where(t => t.Lourd);

            if (criteres.Climatisation)
                query = query.Where(t => t.VClimatise);

            if (criteres.CigaretteAutorisee)
                query = query.Where(t => t.Cigarette);

            if (criteres.AnimauxAutorises)
                query = query.Where(t => t.Animaux);

            if (criteres.VoyageAvec != null)
            {
                switch (criteres.VoyageAvec)
                {
                    case VoyageAvecType.TOUS:
                        query = query.Where(t => t.VoyageAvec == VoyageAvecType.TOUS);
                        break;
                    case VoyageAvecType.FILLES:
                        query = query.Where(t => t.VoyageAvec == VoyageAvecType.FILLES);
                        break;
                    case VoyageAvecType.GARCONS:
                        query = query.Where(t => t.VoyageAvec == VoyageAvecType.GARCONS);
                        break;
                }
            }

            retour.Count = await query.CountAsync();
            if (pageNb == 1)
            {
                retour.NbreAvant6H = await query.Where(t => t.DateHeureDepart.Hour <= 5).CountAsync();
                retour.NbreEntre6H12H = await query.Where(t => t.DateHeureDepart.Hour >= 6 && t.DateHeureDepart.Hour <= 11).CountAsync();
                retour.NbreEntre12H18H = await query.Where(t => t.DateHeureDepart.Hour >= 12 && t.DateHeureDepart.Hour <= 17).CountAsync();
                retour.NbreApres18H = await query.Where(t => t.DateHeureDepart.Hour >= 18).CountAsync();
                retour.NbreSuperDriver = await query.Where(t => t.User.SuperDriver).CountAsync();
                retour.NbreSuperUser = await query.Where(t => t.User.SuperUser).CountAsync();
                retour.NbreProfilVerifie = await query.Where(t => t.User.Verifie).CountAsync();
                retour.NbreMax2Arriere = await query.Where(t => t.Max2).CountAsync();
                retour.NbreReservationInst = await query.Where(t => t.Instantane).CountAsync();
                retour.NbreBLeger = await query.Where(t => t.Leger).CountAsync();
                retour.NbreBMoyen = await query.Where(t => t.Moyen).CountAsync();
                retour.NbreBLourd = await query.Where(t => t.Lourd).CountAsync();
                retour.NbreClimatisation = await query.Where(t => t.VClimatise).CountAsync();
                retour.NbreCigaretteAuto = await query.Where(t => t.Cigarette).CountAsync();
                retour.NbreAnimauxAuto = await query.Where(t => t.Animaux).CountAsync();
                retour.NbreVoyageAvecTous = await query.Where(t => t.VoyageAvec == VoyageAvecType.TOUS).CountAsync();
                retour.NbreVoyageAvecFilles = await query.Where(t => t.VoyageAvec == VoyageAvecType.FILLES).CountAsync();
                retour.NbreVoyageAvecGarcons = await query.Where(t => t.VoyageAvec == VoyageAvecType.GARCONS).CountAsync();
            }

            switch (tri)
            {
                case TrajetAnnonceTriTypeDto.DEPART_PLUS_TOT:
                    query = query.OrderBy(t => t.DateHeureDepart);
                    break;
                case TrajetAnnonceTriTypeDto.PRIX_PLUS_BAS:
                    query = query.OrderBy(t => t.Prix);
                    break;
                case TrajetAnnonceTriTypeDto.PROCHE_POINT_DEPART:
                    //query = query.OrderBy(t => t.DateHeureDepart);
                    break;
                case TrajetAnnonceTriTypeDto.PROCHE_POINT_ARRIVE:
                    //query = query.OrderBy(t => t.DateHeureDepart);
                    break;
            }

            var nbPageElts = 10;
            var skip = nbPageElts * (pageNb - 1);
            retour.Trajets = await query
                .Select(t => new RechTrajetAnnonceDto() { 
                    Id = t.Id,
                    Depart = t.Depart,
                    Destination = t.Destination,
                    DateHeureDepart = t.DateHeureDepart,
                    NombrePlaces = t.NombrePlaces,
                    NombrePlacesDispo = t.NombrePlacesDispo,
                    Prix = t.Prix,
                    Instantane = t.Instantane,
                    VoyageAvec = t.VoyageAvec,
                    VMarque = t.VMarque,
                    VModele = t.VModele,
                    VClimatise = t.VClimatise,
                    VCouleur = t.VCouleur,
                    VTypeVehicule = t.VTypeVehicule,
                    VVerifie = t.VVerifie,
                    VImage1 = t.VImage1,
                    Cigarette = t.Cigarette,
                    Animaux = t.Animaux,
                    Max2 = t.Max2,
                    Leger = t.Leger,
                    Moyen = t.Moyen,
                    Lourd = t.Lourd,
                    UserId = t.UserId,
                    UId = t.User.UId,
                    UNom = t.User.Nom,
                    UPrenom = t.User.Prenom,
                    UImgUrl = t.User.ImgUrl,
                    USexe = t.User.Sexe,
                    USuperDriver = t.User.SuperDriver,
                    USuperUser = t.User.SuperUser,
                    UVerifie = t.User.Verifie
                })
                .Skip(skip)
                .Take(nbPageElts)
                .ToListAsync();

            return retour;
        }

        //GET : api/TrajetsAnnonces/User/5
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<RechTrajetAnnonceDto>>> GetTrajetsAnnoncesUser(int userId)
        {
            if (_dbContext.TrajetsAnnonces == null)
                return NotFound();
            return await _dbContext.TrajetsAnnonces
                .Where(t => t.UserId == userId &&
                            t.DateHeureDepart >= DateTime.Now)
                .OrderBy(t => t.DateHeureDepart)
                .Select(t => new RechTrajetAnnonceDto()
                {
                    Id = t.Id,
                    Depart = t.Depart,
                    Destination = t.Destination,
                    DateHeureDepart = t.DateHeureDepart,
                    NombrePlaces = t.NombrePlaces,
                    NombrePlacesDispo = t.NombrePlacesDispo,
                    Prix = t.Prix,
                    Instantane = t.Instantane,
                    VoyageAvec = t.VoyageAvec,
                    VMarque = t.VMarque,
                    VModele = t.VModele,
                    VClimatise = t.VClimatise,
                    VCouleur = t.VCouleur,
                    VTypeVehicule = t.VTypeVehicule,
                    VVerifie = t.VVerifie,
                    VImage1 = t.VImage1,
                    Cigarette = t.Cigarette,
                    Animaux = t.Animaux,
                    Max2 = t.Max2,
                    Leger = t.Leger,
                    Moyen = t.Moyen,
                    Lourd = t.Lourd,
                    UserId = t.UserId,
                    UId = t.User.UId,
                    UNom = t.User.Nom,
                    UPrenom = t.User.Prenom,
                    UImgUrl = t.User.ImgUrl,
                    USexe = t.User.Sexe,
                    USuperDriver = t.User.SuperDriver,
                    USuperUser = t.User.SuperUser,
                    UVerifie = t.User.Verifie
                })
                .ToListAsync();
        }

        //GET : api/TrajetsAnnonces/UserHis/5
        [HttpGet("UserHis/{userId}")]
        public async Task<ActionResult<IEnumerable<RechTrajetAnnonceDto>>> GetTrajetsAnnoncesUserHistorique(int userId)
        {
            if (_dbContext.TrajetsAnnonces == null)
                return NotFound();
            return await _dbContext.TrajetsAnnonces
                .Where(t => t.UserId == userId &&
                            t.DateHeureDepart < DateTime.Now)
                .OrderByDescending(t => t.DateHeureDepart)
                .Select(t => new RechTrajetAnnonceDto()
                {
                    Id = t.Id,
                    Depart = t.Depart,
                    Destination = t.Destination,
                    DateHeureDepart = t.DateHeureDepart,
                    NombrePlaces = t.NombrePlaces,
                    NombrePlacesDispo = t.NombrePlacesDispo,
                    Prix = t.Prix,
                    Instantane = t.Instantane,
                    VoyageAvec = t.VoyageAvec,
                    VMarque = t.VMarque,
                    VModele = t.VModele,
                    VClimatise = t.VClimatise,
                    VCouleur = t.VCouleur,
                    VTypeVehicule = t.VTypeVehicule,
                    VVerifie = t.VVerifie,
                    VImage1 = t.VImage1,
                    Cigarette = t.Cigarette,
                    Animaux = t.Animaux,
                    Max2 = t.Max2,
                    Leger = t.Leger,
                    Moyen = t.Moyen,
                    Lourd = t.Lourd,
                    UserId = t.UserId,
                    UId = t.User.UId,
                    UNom = t.User.Nom,
                    UPrenom = t.User.Prenom,
                    UImgUrl = t.User.ImgUrl,
                    USexe = t.User.Sexe,
                    USuperDriver = t.User.SuperDriver,
                    USuperUser = t.User.SuperUser,
                    UVerifie = t.User.Verifie
                })
                .Take(10)
                .ToListAsync();
        }

        //GET : api/TrajetsAnnonces/UserReservation/5
        [HttpGet("UserReservation/{userId}")]
        public async Task<ActionResult<IEnumerable<RechTrajetAnnonceDto>>> GetTrajetsAnnoncesUserReservation(int userId)
        {
            if (_dbContext.TrajetsAnnonces == null)
            {
                return NotFound();
            }
            return await _dbContext.TrajetsAnnonces
                .Where(t => t.Reservations.Any(r => r.UserId == userId) &&
                            t.DateHeureDepart >= DateTime.Now)
                .OrderBy(t => t.DateHeureDepart)
                .Select(t => new RechTrajetAnnonceDto()
                {
                    Id = t.Id,
                    Depart = t.Depart,
                    Destination = t.Destination,
                    DateHeureDepart = t.DateHeureDepart,
                    NombrePlaces = t.NombrePlaces,
                    NombrePlacesDispo = t.NombrePlacesDispo,
                    Prix = t.Prix,
                    Instantane = t.Instantane,
                    VoyageAvec = t.VoyageAvec,
                    VMarque = t.VMarque,
                    VModele = t.VModele,
                    VClimatise = t.VClimatise,
                    VCouleur = t.VCouleur,
                    VTypeVehicule = t.VTypeVehicule,
                    VVerifie = t.VVerifie,
                    VImage1 = t.VImage1,
                    Cigarette = t.Cigarette,
                    Animaux = t.Animaux,
                    Max2 = t.Max2,
                    Leger = t.Leger,
                    Moyen = t.Moyen,
                    Lourd = t.Lourd,
                    UserId = t.UserId,
                    UId = t.User.UId,
                    UNom = t.User.Nom,
                    UPrenom = t.User.Prenom,
                    UImgUrl = t.User.ImgUrl,
                    USexe = t.User.Sexe,
                    USuperDriver = t.User.SuperDriver,
                    USuperUser = t.User.SuperUser,
                    UVerifie = t.User.Verifie,
                    IsRes = true,
                    StatutRes = t.Reservations.Single(r => r.UserId == userId).Status
                })
                .ToListAsync();
        }

        //GET : api/TrajetsAnnonces/UserReservationHis/5
        [HttpGet("UserReservationHis/{userId}")]
        public async Task<ActionResult<IEnumerable<RechTrajetAnnonceDto>>> GetTrajetsAnnoncesUserReservationHistorique(int userId)
        {
            if (_dbContext.TrajetsAnnonces == null)
            {
                return NotFound();
            }
            return await _dbContext.TrajetsAnnonces
                .Where(t => t.Reservations.Any(r => r.UserId == userId) &&
                            t.DateHeureDepart < DateTime.Now)
                .OrderByDescending(t => t.DateHeureDepart)
                .Select(t => new RechTrajetAnnonceDto()
                {
                    Id = t.Id,
                    Depart = t.Depart,
                    Destination = t.Destination,
                    DateHeureDepart = t.DateHeureDepart,
                    NombrePlaces = t.NombrePlaces,
                    NombrePlacesDispo = t.NombrePlacesDispo,
                    Prix = t.Prix,
                    Instantane = t.Instantane,
                    VoyageAvec = t.VoyageAvec,
                    VMarque = t.VMarque,
                    VModele = t.VModele,
                    VClimatise = t.VClimatise,
                    VCouleur = t.VCouleur,
                    VTypeVehicule = t.VTypeVehicule,
                    VVerifie = t.VVerifie,
                    VImage1 = t.VImage1,
                    Cigarette = t.Cigarette,
                    Animaux = t.Animaux,
                    Max2 = t.Max2,
                    Leger = t.Leger,
                    Moyen = t.Moyen,
                    Lourd = t.Lourd,
                    UserId = t.UserId,
                    UId = t.User.UId,
                    UNom = t.User.Nom,
                    UPrenom = t.User.Prenom,
                    UImgUrl = t.User.ImgUrl,
                    USexe = t.User.Sexe,
                    USuperDriver = t.User.SuperDriver,
                    USuperUser = t.User.SuperUser,
                    UVerifie = t.User.Verifie,
                    IsRes = true,
                    StatutRes = t.Reservations.Single(r => r.UserId == userId).Status
                })
                .Take(10)
                .ToListAsync();
        }

        //GET : api/TrajetsAnnonces/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TrajetAnnonce>> GetTrajetAnnonce(int id)
        {
            if (_dbContext.TrajetsAnnonces == null)
            {
                return NotFound();
            }

            var trajetAnnonce = await _dbContext.TrajetsAnnonces
                .Where(u => u.Id == id)
                .Include(u => u.User)
                .ThenInclude(u => u.Preferences)
                .Include(u => u.Reservations)
                .ThenInclude(u => u.UserRes)
                .FirstOrDefaultAsync();

            if (trajetAnnonce == null)
                return NotFound();

            return Ok(trajetAnnonce);
        }

        //GET : api/TrajetsAnnonces/User/5
        [HttpGet("PrixMoyen/{depart}/{destination}")]
        public async Task<ActionResult<double>> GetPrixMoyen(string depart, string destination)
        {
            if (_dbContext.TrajetsAnnonces == null)
                return NotFound();
            return await _dbContext.TrajetsAnnonces
                .Where(t => t.Depart.ToUpper() == depart.ToUpper() &&
                            t.Destination.ToUpper() == destination.ToUpper() &&
                            t.DateHeureDepart >= DateTime.Now)
                .Select(t => t.Prix)
                .AverageAsync();
        }

        //POST : api/TrajetAnnonce
        [HttpPost]
        public async Task<ActionResult<User>> PostTrajetAnnonce(TrajetAnnonce trajetAnnonce)
        {
            if (!UserExists(trajetAnnonce.UserId))
                return BadRequest("Utilisateur inexistant");

            if (string.IsNullOrWhiteSpace(trajetAnnonce.Depart) || trajetAnnonce.Depart.Length < 3)
                return BadRequest("Départ: longueur inférieure à 3");

            if (string.IsNullOrWhiteSpace(trajetAnnonce.Destination) || trajetAnnonce.Destination.Length < 3)
                return BadRequest("Destination: longueur inférieure à 3");

            if (trajetAnnonce.DateHeureDepart <  DateTime.Now)
                return BadRequest("Date heure départ dans le passé");

            if (trajetAnnonce.DateHeureDepart.Subtract(DateTime.Now).TotalHours < 1d)
                return BadRequest("Date heure départ moins d'une heure");

            if (trajetAnnonce.NombrePlaces < 1)
                return BadRequest("Nombre de places doit être supérieur à 0");

            if (trajetAnnonce.Prix < 0)
                return BadRequest("Prix doit être positif");

            if (!VehiculeExists(trajetAnnonce.VehiculeId, trajetAnnonce.UserId))
                return BadRequest("Véhicule non définie");

            trajetAnnonce.NombrePlacesDispo = trajetAnnonce.NombrePlaces;
            trajetAnnonce.DateCreation = DateTime.Now;

            var vehicule = _dbContext.Vehicules.FirstOrDefault(x => x.Id == trajetAnnonce.VehiculeId && x.UserId == trajetAnnonce.UserId);
            if (vehicule != null)
            {
                trajetAnnonce.VMatricule = vehicule.Matricule;
                trajetAnnonce.VCouleur = vehicule.Couleur;
                trajetAnnonce.VMarque = vehicule.Marque;
                trajetAnnonce.VModele = vehicule.Modele;
                trajetAnnonce.VTypeVehicule = vehicule.TypeVehicule;
                trajetAnnonce.VCouleur = vehicule.Couleur;
                trajetAnnonce.VImage1 = vehicule.Image1;
                trajetAnnonce.VFileAssurance = vehicule.FileAssurance;
                trajetAnnonce.VFileCarteGrise = vehicule.FileCarteGrise;
                trajetAnnonce.VFileVisiteTech = vehicule.FileVisiteTech;
                trajetAnnonce.VMiseEnCirculation = vehicule.MiseEnCirculation;
                trajetAnnonce.VDateAssurance = vehicule.DateAssurance;
                trajetAnnonce.VDateAssuranceProch = vehicule.DateAssuranceProch;
                trajetAnnonce.VDateVisiteTech = vehicule.DateVisiteTech;
                trajetAnnonce.VDateVisiteTechProch = vehicule.DateVisiteTechProch;
            }

            _dbContext.TrajetsAnnonces.Add(trajetAnnonce);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTrajetAnnonce), new { id = trajetAnnonce.Id }, trajetAnnonce);
        }

        //PUT : api/TrajetAnnonce/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrajetAnnonce(int id, TrajetAnnonce trajetAnnonce)
        {
            if (id != trajetAnnonce.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(trajetAnnonce).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrajetAnnonceExists(id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        //DELETE : api/TrajetAnnonce/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrajetAnnonce(int id)
        {
            if (_dbContext.TrajetsAnnonces == null)
                return NotFound();

            var trajetAnnonce = await _dbContext.TrajetsAnnonces.FindAsync(id);
            if (trajetAnnonce == null)
                return NotFound();

            _dbContext.TrajetsAnnonces.Remove(trajetAnnonce);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_dbContext.Users?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        private bool TrajetAnnonceExists(int id)
        {
            return (_dbContext.TrajetsAnnonces?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        private bool VehiculeExists(int id, int userId)
        {
            return (_dbContext.Vehicules?.Any(u => u.Id == id && u.UserId == userId)).GetValueOrDefault();
        }
    }
}
