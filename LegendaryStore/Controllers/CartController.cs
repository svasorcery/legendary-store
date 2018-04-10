using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LegendaryStore.Controllers
{
    using LegendaryStore.Entities;
    using LegendaryStore.Services;

    [Authorize]
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        private readonly StoreDbService _db;

        public CartController(StoreDbService dbService)
        {
            _db = dbService;
        }


        public async Task<IActionResult> Get()
        {
            var cart = await _db.GetCartItemsAsync();

            return Ok(cart);
        }

        [HttpGet("add/{productId:int}")]
        public async Task<IActionResult> Add([FromRoute]int productId)
        {
            var product = await _db.GetProductAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            var item = await _db.AddToCartAsync(product);

            return Ok(item);
        }

        [HttpGet("remove/{productId:int}")]
        public async Task<IActionResult> Remove([FromRoute]int productId)
        {
            var item = await _db.GetCarItemAsync(productId);

            if (item == null)
            {
                return NotFound();
            }

            await _db.RemoveFromCartAsync(item);

            return Ok(item);
        }

        [HttpGet]
        public async Task<IActionResult> Checkout()
        {
            var items = await _db.GetCartItemsAsync();

            var order = new Order
            {
                CheckoutBegan = DateTime.Now.ToUniversalTime(),
                Username = User.Identity.Name,
                Total = items.Sum(i => i.PricePerUnit * i.Quantity),
                Status = OrderState.CheckingOut,
                Lines = items.Select(i => new OrderLine
                {
                    ProductId = i.ProductId,
                    Product = i.Product,
                    Quantity = i.Quantity,
                    PricePerUnit = i.PricePerUnit,
                }).ToList()
            };
            
            var orderNew = await _db.CreateOrderAsync(order);

            return Ok(orderNew);
        }

        [HttpPut]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Checkout([FromBody]Order formOrder)
        {
            var order = await _db.GetOrderAsync(formOrder.OrderId);

            if (order == null)
            {
                return NotFound();
            }

            if (order.Username != User.Identity.Name)
            {
                return Forbid();
            }

            if (order.Status != OrderState.CheckingOut)
            {
                return BadRequest();
            }

            // Place order
            await _db.CheckoutOrderAsync(order.OrderId, formOrder);

            // Remove items from cart
            var cartItems = await _db.GetCartItemsAsync();
            foreach (var item in cartItems)
            {
                if (order.Lines.Any(l => l.ProductId == item.ProductId))
                {
                    await _db.RemoveFromCartAsync(item);
                }
            }
            
            return Ok(order);
        }
    }
}
