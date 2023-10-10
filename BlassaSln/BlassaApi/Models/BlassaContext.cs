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
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Vehicule> Vehicules { get; set; }
    }
}
