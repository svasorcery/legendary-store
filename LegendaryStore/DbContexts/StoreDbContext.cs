using LegendaryStore.Entities;
using Microsoft.EntityFrameworkCore;

namespace LegendaryStore.DbContexts
{
    public class StoreDbContext : DbContext
    {
        public StoreDbContext(DbContextOptions<StoreDbContext> options)
                : base(options)
            { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
