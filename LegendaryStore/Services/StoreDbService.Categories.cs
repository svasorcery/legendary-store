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
            _storeDb.Categories.Add(model);

            return _storeDb.SaveChangesAsync();
        }

        public async Task<Category> UpdateCategoryAsync(int id, Category model)
        {
            var update = await GetCategoryAsync(id);

            update.Name = model.Name;
            update.ParentId = model.ParentId;

            _storeDb.Categories.Update(update);
            await _storeDb.SaveChangesAsync();

            return model;
        }

        public async Task RemoveCategoryAsync(int id)
        {
            var remove = await GetCategoryAsync(id);

            _storeDb.Categories.Remove(remove);
            await _storeDb.SaveChangesAsync();
        }


        public Task<CategoryListItem[]> GetTopLevelCategoriesAsync()
        {
            return _storeDb.Categories
                .Where(x => x.ParentId == null)
                .Select(x => new CategoryListItem
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .ToArrayAsync();
        }

        public async Task<IEnumerable<CategoryListItem>> GetCategoryParentsListAsync(int id)
        {
            var allCategories = await _storeDb.Categories.ToArrayAsync();
            var root = allCategories.FirstOrDefault(c => c.Id == id);
            var tree = SeedParentsTree(root);
            return tree.Select(x => new CategoryListItem(x.Id, x.Name));
        }

        public async Task<IEnumerable<CategoryMenuItem>> GetCategoryChildsTreeAsync(int id)
        {
            var allCategories = await GetCategoriesAsync();
            var roots = allCategories.Where(c => c.ParentId == id);
            var tree = roots.Select(root => SeedChildsTree(root, allCategories));
            return tree;
        }

        public async Task<IEnumerable<CategoryMenuItem>> GetRootCategoriesChildsTreeAsync()
        {
            var allCategories = await GetCategoriesAsync();
            var roots = allCategories.Where(c => c.ParentId == null);
            var tree = roots.Select(root => SeedChildsTree(root, allCategories));
            return tree;
        }


        private IEnumerable<Category> SeedParentsTree(Category category)
        {
            var parents = new List<Category>();

            AddParent(category, parents);

            return parents;
        }

        private IEnumerable<Category> AddParent(Category category, ICollection<Category> parents)
        {
            parents.Add(category);

            if (category.ParentId != null)
            {
                AddParent(category.Parent, parents);
            }

            return parents;
        }

        private CategoryMenuItem SeedChildsTree(Category category, IEnumerable<Category> sourceItems)
        {
            var item = new CategoryMenuItem
            {
                Id = category.Id,
                Name = category.Name,
                ParentId = category.ParentId,
                Children = category.Children == null ? null : new List<CategoryMenuItem>()
            };

            if (!sourceItems.Select(x => x.ParentId).Contains(category.Id))
            {
                return item;
            }

            foreach (var child in sourceItems.Where(x => x.ParentId == category.Id))
            {
                var grandChild = SeedChildsTree(child, sourceItems);
                item.Children.Add(grandChild);
            }

            return item;
        }
    }
}
