using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LegendaryStore.Controllers
{
    using LegendaryStore.DbContexts;
    using LegendaryStore.Entities;
    using LegendaryStore.Models;

    [Route("api/[controller]")]
    public class StoreController : Controller
    {
        private readonly StoreDbContext _db;

        public StoreController(StoreDbContext dbContext)
        {
            _db = dbContext;
        }


        public async Task<IActionResult> Get()
        {
            var items = await _db.Categories.ToListAsync();

            var tree = GetCategoryMenuTree(items);

            return Ok(tree);
        }


        private IEnumerable<CategoryMenuItem> GetCategoryMenuTree(IEnumerable<Category> items)
        {
            var roots = items.Where(c => c.ParentId == null);

            return roots.Select(r => GetChild(r, items));
        }

        private CategoryMenuItem GetChild(Category category, IEnumerable<Category> list)
        {
            var menuItem = new CategoryMenuItem
            {
                Id = category.Id,
                Name = category.Name,
                ParentId = category.ParentId,
                Children = category.Children == null ? null : new List<CategoryMenuItem>()
            };

            if (!list.Select(x => x.ParentId).Contains(category.Id))
            {
                return menuItem;
            }

            foreach (var child in list.Where(x => x.ParentId == category.Id))
            {
                var grandChild = GetChild(child, list);
                menuItem.Children.Add(grandChild);
            }

            return menuItem;
        }
    }
}
