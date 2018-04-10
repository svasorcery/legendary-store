using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LegendaryStore.Entities;

namespace LegendaryStore.Services
{
    public partial class StoreDbService
    {
        public Task<Order> GetOrderAsync(int id)
        {
            return _storeDb.Orders
                .AsNoTracking()
                .Include(o => o.Lines)
                .ThenInclude(ol => ol.Product)
                .FirstOrDefaultAsync(x => x.OrderId == id);
        }

        public async Task<Order> CreateOrderAsync(Order model)
        {
            var order = _storeDb.Orders.Add(model).Entity;

            await _storeDb.SaveChangesAsync();

            return order;
        }

        public async Task<Order> CheckoutOrderAsync(int id, Order model)
        {
            var update = await GetOrderAsync(id);

            update.ShippingZipCode = model.ShippingZipCode;
            update.ShippingCountry = model.ShippingCountry;
            update.ShippingState = model.ShippingState;
            update.ShippingCity = model.ShippingCity;
            update.ShippingAddress = model.ShippingAddress;

            update.Status = OrderState.Placed;
            update.OrderPlaced = DateTime.Now.ToUniversalTime();

            _storeDb.Orders.Update(update);
            await _storeDb.SaveChangesAsync();

            return update;
        }

        public Task RemoveOrderAsync(Order item)
        {
            _storeDb.Orders.Remove(item);

            return _storeDb.SaveChangesAsync();
        }
    }
}
