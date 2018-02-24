using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LegendaryStore.Entities;

namespace LegendaryStore.Services
{
    public partial class StoreDbService
    {

        public Task<Rating[]> GetRatingsAsync()
        {
            return _storeDb.Rating
                .Include(x => x.Product)
                .Where(i => i.UserName == _userService.GetUserName())
                .ToArrayAsync();
        }

        public Task<Rating> GetRatingAsync(int productId)
        {
            var userName = _userService.GetUserName();

            return _storeDb.Rating
                .Include(x => x.Product)
                .SingleOrDefaultAsync(i => i.ProductId == productId
                                        && i.UserName == userName);
        }

        public async Task<Rating> RateProductAsync(Product product, RatingRate rate)
        {
            var userName = _userService.GetUserName();

            var rating = new Rating
            {
                ProductId = product.Id,
                UserName = userName,
                Rate = rate,
                RatedAt = DateTime.Now.ToUniversalTime()
            };

            var entity = _storeDb.Rating.Add(rating).Entity;

            await _storeDb.SaveChangesAsync();

            return entity;
        }
    }
}
