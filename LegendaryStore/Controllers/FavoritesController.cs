using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LegendaryStore.Controllers
{
    using LegendaryStore.Services;

    [Authorize]
    [Route("api/[controller]")]
    public class FavoritesController : Controller
    {
        private readonly StoreDbService _db;

        public FavoritesController(StoreDbService dbService)
        {
            _db = dbService;
        }


        [HttpGet("add/{productId:int}")]
        public async Task<IActionResult> Add([FromRoute]int productId)
        {
            var product = await _db.GetProductAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            var item = await _db.AddToFavoritesAsync(product);

            return Ok(item);
        }

        [HttpGet("remove/{productId:int}")]
        public async Task<IActionResult> Remove([FromRoute]int productId)
        {
            var item = await _db.GetFavoriteAsync(productId);

            if (item == null)
            {
                return NotFound();
            }

            await _db.RemoveFromFavoritesAsync(item);

            return Ok(item);
        }
    }
}
