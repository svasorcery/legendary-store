using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LegendaryStore.Controllers
{
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
        public async Task<IActionResult> Add(int productId)
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
        public async Task<IActionResult> Remove(int productId)
        {
            var item = await _db.GetCarItemAsync(productId);

            if (item == null)
            {
                return NotFound();
            }

            await _db.RemoveFromCartAsync(item);

            return Ok(item);
        }
    }
}
