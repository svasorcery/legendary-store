using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LegendaryStore.Controllers
{
    using LegendaryStore.Entities;
    using LegendaryStore.Models;
    using LegendaryStore.Services;

    [Authorize]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly StoreDbService _db;

        public ProductsController(StoreDbService dbService)
        {
            _db = dbService;
        }


        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery]string term)
        {
            var result = await _db.SearchProductsAsync(term);

            return Ok(result);
        }

        [HttpGet("by-category/{categoryId:int}")]
        public async Task<IActionResult> ByCategory([FromRoute]int categoryId, int page = 1)
        {
            const int itemsPerPage = 2;

            var items = await _db.GetProductsAsync(categoryId, page, itemsPerPage);
            var totalCount = await _db.GetProductsCountAsync(categoryId);

            var result = new ProductsList
            {
                Items = items,
                Paging = new Paging
                {
                    Page = page,
                    TotalItems = totalCount,
                    ItemsPerPage = itemsPerPage,
                    TotalPages = (int)Math.Ceiling((double)totalCount / itemsPerPage)
                }
            };

            return Ok(result);
        }

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
