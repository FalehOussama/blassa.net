using Microsoft.EntityFrameworkCore;

namespace BlassaApi.Models
{
    public class BlassaContext : DbContext
    {
        public BlassaContext(DbContextOptions<BlassaContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(e => e.Preferences)
                .WithOne()
                .HasForeignKey<Preferences>(e => e.UserId)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(e => e.Vehicules)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(e => e.TrajetsAnnonces)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(e => e.Reservations)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Commentaires)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasMany(e => e.CommentairesPost)
                .WithOne(e => e.UserComm)
                .HasForeignKey(e => e.UserCommId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Avis)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasMany(e => e.AvisPost)
                .WithOne(e => e.UserAvi)
                .HasForeignKey(e => e.UserAviId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasMany(e => e.AvisConducteur)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasMany(e => e.AvisConducteurPost)
                .WithOne(e => e.UserAvi)
                .HasForeignKey(e => e.UserAviId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<TrajetAnnonce>()
                .HasMany(e => e.Reservations)
                .WithOne()
                .HasForeignKey(e => e.TrajetAnnonceId)
                .IsRequired();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Vehicule> Vehicules { get; set; }
        public DbSet<TrajetAnnonce> TrajetsAnnonces { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Commentaire> Commentaires { get; set; }
        public DbSet<Avi> Avis { get; set; }
        public DbSet<AviConducteur> AvisConducteur { get; set; }
    }
}
