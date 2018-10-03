using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LegendaryStore.Entities;
using LegendaryStore.Common;

namespace LegendaryStore.Services
{
    public partial class StoreDbService
    {
        public async Task<IPagedList<Product>> SearchProductsAsync(string term,int page,int itemsPerPage)
        {
            var query = _storeDb.Products.AsQueryable();
            if (!String.IsNullOrEmpty(term))
            {
                term = term.Trim();
                 query = query.Where(x => x.Name.Equals(term,StringComparison.CurrentCultureIgnoreCase));
            }
            var skip = itemsPerPage * (page - 1);
            var total = await query.CountAsync();
            var items = new PagedList<Product>(query.OrderBy(x=>x.Id).Skip(skip)
                .Take(itemsPerPage),total,itemsPerPage,page);
            return items;
        }

        public Task<int> GetProductsCountAsync(int categoryId)
            => _storeDb.Products.Where(x => x.CategoryId == categoryId).CountAsync();

        public async Task<IPagedList<Product>> GetProductsAsync(int categoryId, int page, int itemsPerPage)
        {
            var skip = itemsPerPage * (page - 1);
            var query = _storeDb.Products
                .Where(x => x.CategoryId == categoryId);
            var total = await query.CountAsync();
            var items = new PagedList<Product>(query.OrderBy(x=>x.Id).Skip(skip)
                .Take(itemsPerPage),total,itemsPerPage,page);
            return items;
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
