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
                new Product { Name = "Steve McConnell \"Code Complete: A Practical Handbook of Software Construction\"", CategoryId = 3, Quantity = 7, Price = 29.97m, Description = "", ImageUrl = "http://bit.ly/2Ee0I6G" },
                new Product { Name = "Herbert Schildt \"C# 4.0 The Complete Reference\"", CategoryId = 8, Quantity = 2, Price = 29.41m, Description = "", ImageUrl = "http://bit.ly/2DIqH4X" },
                new Product { Name = "Jeffrey Richter \"CLR via C# 5.0 and .NET Framework 4.5\"", CategoryId = 8, Quantity = 5, Price = 32.66m, Description ="", ImageUrl = "http://bit.ly/2npA1ns" },
                new Product { Name = "Andrew Troelsen \"C# 6.0 and the .NET 4.6 Framework\"", CategoryId = 8, Quantity = 3, Price = 27.98m, Description = "", ImageUrl = "http://bit.ly/2rPw3dg" },
                new Product { Name = "Joseph Albahari \"C# 7.0 in a Nutshell: The Definitive Reference\"", CategoryId = 8, Quantity = 7, Price = 62.50m, Description = "", ImageUrl = "http://bit.ly/2FphE9m" },
                new Product { Name = "James R. Groff \"SQL: The Complete Reference\"", CategoryId = 5, Quantity = 10, Price = 30.29m, Description = "", ImageUrl = "http://bit.ly/2DUDuVk" },
                new Product { Name = "C.J. Date \"An Introduction to Database Systems\"", CategoryId = 5, Quantity = 6, Price = 46.01m, Description = "", ImageUrl = "http://bit.ly/2DMPf0C" },
                new Product { Name = "Kyle Simpson \"You Don't Know JS\"", CategoryId = 10, Quantity = 15, Price = 13.67m, Description = "", ImageUrl = "http://bit.ly/2DG8pBh" },
                new Product { Name = "John Resig \"Secrets of the JavaScript Ninja\"", CategoryId = 10, Quantity = 12, Price = 25.56m, Description = "", ImageUrl = "http://bit.ly/2BCR9uO" },
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
