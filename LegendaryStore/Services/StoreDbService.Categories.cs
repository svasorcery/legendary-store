using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using LegendaryStore.Entities;
using LegendaryStore.Models;

namespace LegendaryStore.Services
{
    public partial class StoreDbService
    {
        public Task<Category[]> GetCategoriesAsync()
        {
            return _storeDb.Categories
                .OrderBy(x => x.ParentId)
                .OrderBy(x => x.Name)
                .ToArrayAsync();
        }

        public Task<Category> GetCategoryAsync(int id)
        {
            return _storeDb.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<int> CreateCategoryAsync(Category model)
        {
            _storeDb.Add(model);

            return _storeDb.SaveChangesAsync();
        }

        public async Task<Category> UpdateCategoryAsync(int id, Category model)
        {
            var update = await GetCategoryAsync(id);

            update.Name = model.Name;
            update.ParentId = model.ParentId;

            _storeDb.Update(update);
            await _storeDb.SaveChangesAsync();

            return model;
        }

        public Task RemoveCategoryAsync(int id)
        {
            var remove = GetCategoryAsync(id);

            _storeDb.Remove(remove);
            return _storeDb.SaveChangesAsync();
        }


        public async Task<IEnumerable<CategoryMenuItem>> GetCategoriesMenuTreeAsync()
        {
            var items = await GetCategoriesAsync();

            var roots = items.Where(c => c.ParentId == null);

            var tree = roots.Select(root => SeedTree(root, items));

            return tree;
        }

        private CategoryMenuItem SeedTree(Category category, IEnumerable<Category> list)
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
                var grandChild = SeedTree(child, list);
                menuItem.Children.Add(grandChild);
            }

            return menuItem;
        }
    }
}
