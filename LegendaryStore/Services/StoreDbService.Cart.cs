using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LegendaryStore.Entities;

namespace LegendaryStore.Services
{
    public partial class StoreDbService
    {
        public Task<CartItem[]> GetCartItemsAsync()
        {
            return _storeDb.CartItems
                .Where(i => i.UserName == _userService.GetUserName())
                .Include(i => i.Product)
                .ToArrayAsync();
        }

        public Task<CartItem> GetCarItemAsync(int productId)
        {
            var userName = _userService.GetUserName();

            return _storeDb.CartItems
                .SingleOrDefaultAsync(i => i.ProductId == productId
                                        && i.UserName == userName);
        }

        public async Task<CartItem> AddToCartAsync(Product product, int quantity = 1)
        {
            var userName = _userService.GetUserName();

            var item = await GetCarItemAsync(product.Id);

            if (item != null)
            {
                item.Quantity += quantity;
                item.PricePerUnit = product.Price;
                item.PriceCalculatedAt = DateTime.Now.ToUniversalTime();
            }
            else
            {
                item = _storeDb.CartItems.Add(new CartItem
                {
                    ProductId = product.Id,
                    PricePerUnit = product.Price,
                    Quantity = quantity,
                    UserName = userName,
                    PriceCalculatedAt = DateTime.Now.ToUniversalTime()
                }).Entity;
            }

            await _storeDb.SaveChangesAsync();

            return item;
        }

        public Task RemoveFromCartAsync(CartItem item)
        {
            _storeDb.CartItems.Remove(item);

            return _storeDb.SaveChangesAsync();
        }
    }
}
