using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LegendaryStore.Controllers
{
    using LegendaryStore.Entities;
    using LegendaryStore.Models;
    using LegendaryStore.Services;

    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly StoreDbService _db;

        public ProductsController(StoreDbService dbService)
        {
            _db = dbService;
        }


        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery]string term,int pageSize = 2, int pageIndex = 1)
        {
            var result = await _db.SearchProductsAsync(term,pageIndex,pageSize);

            return Ok(result);
        }

        [HttpGet("by-category/{categoryId:int}")]
        public async Task<IActionResult> ByCategory([FromRoute]int categoryId, int page = 1, int itemsPerPage = 2)
        {
            var items = await _db.GetProductsAsync(categoryId, page, itemsPerPage);
            return Ok(items);
        }

        [Authorize(Policy = "FullAccess")]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get([FromRoute]int id)
        {
            var product = await _db.GetProductAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var model = new ProductDetails
            {
                Product = product,
                IsFavorite = await _db.IsFavoriteAsync(product.Id),
                RatingTotal = await _db.GetProductRatingAsync(product.Id),
                RatingByUser = await _db.GetRatingByUserAsync(product.Id)
            };

            return Ok(model);
        }

        [Authorize(Policy = "FullAccess")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Product model)
        {
            try
            {
                var id = await _db.CreateProductAsync(model);
                model.Id = id;

                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [Authorize(Policy = "FullAccess")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Edit([FromRoute]int id, [FromBody]Product model)
        {
            try
            {
                await _db.UpdateProductAsync(id, model);

                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [Authorize(Policy = "FullAccess")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            try
            {
                await _db.RemoveProductAsync(id);

                return Ok(new { deleted = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
