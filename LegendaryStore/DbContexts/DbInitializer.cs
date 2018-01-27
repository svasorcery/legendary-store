using System.Linq;
using LegendaryStore.Entities;

namespace LegendaryStore.DbContexts
{
    public static class DbInitializer
    {
        public static void Initialize(StoreDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any categories
            if (context.Categories.Any())
            {
                return; // DB has been seeded
            }

            var categories = new Category[]
            {
                new Category { Name = "Nonfiction", ParentId = null },
                new Category { Name = "Computer Science", ParentId = 1 },
                new Category { Name = "Software Architecture", ParentId = 2 },
                new Category { Name = "Databases", ParentId = 2 },
                new Category { Name = "SQL", ParentId = 4 },
                new Category { Name = "No-SQL", ParentId = 4 },
                new Category { Name = "Languages", ParentId = 2 },
                new Category { Name = "C, C++, C#", ParentId = 7 },
                new Category { Name = "Java", ParentId = 7 },
                new Category { Name = "JavaScript", ParentId = 7 },
                new Category { Name = "Python", ParentId = 7 },
            };

            context.Categories.AddRange(categories);
            context.SaveChanges();

            var products = new Product[]
            {

            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
