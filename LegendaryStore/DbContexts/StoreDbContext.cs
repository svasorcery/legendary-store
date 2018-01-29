using LegendaryStore.Entities;
using Microsoft.EntityFrameworkCore;

namespace LegendaryStore.DbContexts
{
    public class StoreDbContext : DbContext
    {
        public StoreDbContext(DbContextOptions<StoreDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Product>().Property(b => b.Name)
                .IsRequired()
                .HasMaxLength(200);

            builder.Entity<Product>().Property(b => b.Description)
                .HasMaxLength(500);

            builder.Entity<Product>().Property(b => b.Quantity)
                .HasDefaultValue(0);

            builder.Entity<Category>().Property(b => b.Name)
                .IsRequired()
                .HasMaxLength(25);;
        }
    }
}
