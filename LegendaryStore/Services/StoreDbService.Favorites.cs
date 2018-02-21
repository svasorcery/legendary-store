using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LegendaryStore.Entities;

namespace LegendaryStore.Services
{
    public partial class StoreDbService
    {
        public Task<Favorite[]> GetFavoritesAsync()
        {
            return _storeDb.Favorites
                .Include(x => x.Product)
                .Where(i => i.UserName == _userService.GetUserName())
                .ToArrayAsync();
        }

        public Task<Favorite> GetFavoriteAsync(int productId)
        {
            var userName = _userService.GetUserName();

            return _storeDb.Favorites
                .Include(x => x.Product)
                .SingleOrDefaultAsync(i => i.ProductId == productId
                                        && i.UserName == userName);
        }

        public async Task<bool> IsFavoriteAsync(int productId)
        {
            return (await GetFavoriteAsync(productId)) != null;
        }

        public async Task<Favorite> AddToFavoritesAsync(Product product)
        {
            var userName = _userService.GetUserName();

            var favorite = new Favorite
            {
                ProductId = product.Id,
                UserName = userName,
                AddedAt = DateTime.Now.ToUniversalTime()
            };

            var entity = _storeDb.Favorites.Add(favorite).Entity;

            await _storeDb.SaveChangesAsync();

            return entity;
        }

        public Task RemoveFromFavoritesAsync(Favorite item)
        {
            _storeDb.Favorites.Remove(item);

            return _storeDb.SaveChangesAsync();
        }
    }
}
