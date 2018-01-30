using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LegendaryStore.Entities;

namespace LegendaryStore.Services
{
    public partial class StoreDbService
    {
        public Task<Product[]> SearchProductsAsync(string term)
        {
            if (String.IsNullOrEmpty(term))
                return null;

            term = term.Trim().ToUpper();

            return _storeDb.Products
                .Where(x => x.Name.ToUpper().Contains(term))
                .ToArrayAsync();
        }

        public Task<int> GetProductsCountAsync(int categoryId)
            => _storeDb.Products.Where(x => x.CategoryId == categoryId).CountAsync();

        public Task<Product[]> GetProductsAsync(int categoryId, int page, int itemsPerPage)
        {
            var skip = itemsPerPage * (page - 1);

            return _storeDb.Products
                .Where(x => x.CategoryId == categoryId)
                .Skip(skip)
                .Take(itemsPerPage)
                .ToArrayAsync();
        }

        public Task<Product> GetProductAsync(int id)
        {
            return _storeDb.Products.FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<int> CreateProductAsync(Product model)
        {
            _storeDb.Products.Add(model);

            return _storeDb.SaveChangesAsync();
        }

        public async Task<Product> UpdateProductAsync(int id, Product model)
        {
            var update = await GetProductAsync(id);

            update.Name = model.Name;
            update.Description = model.Description;
            update.Price = model.Price;
            update.Quantity = model.Quantity;
            update.ImageUrl = model.ImageUrl;

            _storeDb.Products.Update(update);
            await _storeDb.SaveChangesAsync();

            return model;
        }

        public async Task RemoveProductAsync(int id)
        {
            var remove = await GetProductAsync(id);

            _storeDb.Products.Remove(remove);
            await _storeDb.SaveChangesAsync();
        }
    }
}
