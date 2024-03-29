﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlassaApi.Models;
using BlassaApi.Dto;

namespace BlassaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentairesController : Controller
    {
        private readonly BlassaContext _dbContext;

        public CommentairesController(BlassaContext dbContext)
        {
            _dbContext = dbContext;
        }

        //GET : api/Commentaires/User
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<Commentaire>>> GetCommentairesUser(int userId)
        {
            if (_dbContext.Commentaires == null)
                return NotFound();

            return await _dbContext.Commentaires
                .Include(x => x.UserComm)
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        //GET : api/Commentaires/User/5/1
        [HttpGet("User/{userId}/{page}")]
        public async Task<ActionResult<CommentairesRetourDto>> GetCommentairesUserPaginate(int userId, int page = 1)
        {
            if (_dbContext.Avis == null)
                return NotFound();

            var nbPageElts = 10;
            var skip = nbPageElts * (page - 1);

            var query = _dbContext.Commentaires
                .Where(x => x.UserId == userId);

            var retour = new CommentairesRetourDto();
            retour.Count = await query.CountAsync();
            retour.Commentaires = await query
                .OrderByDescending(x => x.DateComm)
                .Skip(skip)
                .Take(nbPageElts)
                .Select(c => new CommentaireDto()
                {
                    Id = c.Id,
                    DateComm = c.DateComm,
                    UserId = c.UserId,
                    UserCommId = c.UserCommId,
                    Texte = c.Texte,
                    Prenom = c.UserComm.Prenom,
                    ImgUrl = c.UserComm.ImgUrl,
                    SuperDriver = c.UserComm.SuperDriver,
                    SuperUser = c.UserComm.SuperUser,
                    Verifie = c.UserComm.Verifie
                })
                .ToListAsync();

            return retour;
        }

        //GET : api/Commentaires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Commentaire>> GetCommentaire(int id)
        {
            if (_dbContext.Commentaires == null)
                return NotFound();

            var commentaire = await _dbContext.Commentaires
                .Include(x => x.UserComm)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (commentaire == null)
                return NotFound();

            return Ok(commentaire);
        }

        //POST : api/Commentaires
        [HttpPost]
        public async Task<ActionResult<Commentaire>> PostCommentaire(Commentaire commentaire)
        {
            if (!UserExists(commentaire.UserId))
                return BadRequest("Utilisateur inexistant");
            if (!UserExists(commentaire.UserCommId))
                return BadRequest("Utilisateur commentaire inexistant");
            if(string.IsNullOrWhiteSpace(commentaire.Texte))
                return BadRequest("Commentaire vide");

            commentaire.DateComm = DateTime.Now;

            _dbContext.Commentaires.Add(commentaire);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCommentaire), new { id = commentaire.Id }, commentaire);
        }

        //PUT : api/Commentaires/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommentaire(int id, Commentaire commentaire)
        {
            if (id != commentaire.Id)
                return BadRequest();

            _dbContext.Entry(commentaire).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentaireExists(id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        //DELETE : api/Commentaires/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommentaire(int id)
        {
            if (_dbContext.Commentaires == null)
                return NotFound();

            var commentaire = await _dbContext.Commentaires.FindAsync(id);
            if (commentaire == null)
                return NotFound();

            _dbContext.Commentaires.Remove(commentaire);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_dbContext.Users?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        private bool CommentaireExists(int id)
        {
            return (_dbContext.Commentaires?.Any(u => u.Id == id)).GetValueOrDefault();
        }
    }
}
