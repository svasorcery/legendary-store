using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LegendaryStore.Entities;

namespace LegendaryStore.Services
{
    public partial class StoreDbService
    {

        public Task<Rating[]> GetRatingItemsAsync()
        {
            return _storeDb.Rating
                .Include(x => x.Product)
                .Where(i => i.UserName == _userService.GetUserName())
                .ToArrayAsync();
        }

        public Task<Rating> GetRatingItemAsync(int productId)
        {
            var userName = _userService.GetUserName();

            return _storeDb.Rating
                .Include(x => x.Product)
                .SingleOrDefaultAsync(i => i.ProductId == productId
                                        && i.UserName == userName);
        }

        public async Task<bool> IsRatedAsync(int productId)
        {
            var userName = _userService.GetUserName();

            return (await _storeDb.Rating
                .Where(x => x.ProductId == productId && x.UserName == userName)
                .ToArrayAsync()) != null;
        }

        public async Task<float> GetProductRatingAsync(int productId)
        {
            var rates = await _storeDb.Rating
                .Where(x => x.ProductId == productId)
                .Select(x => (int)x.Rate)
                .ToArrayAsync();

            return rates.Count() > 0 ? 
                (float)rates.Sum() / rates.Count() :
                0.0f;
        }

        public async Task<Rating> RateProductAsync(Product product, RatingRate rate)
        {
            var rating = new Rating
            {
                ProductId = product.Id,
                UserName = _userService.GetUserName(),
                Rate = rate,
                RatedAt = DateTime.Now.ToUniversalTime()
            };

            var entity = _storeDb.Rating.Add(rating).Entity;

            await _storeDb.SaveChangesAsync();

            return entity;
        }
    }
}
