using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LegendaryStore.Controllers
{
    using LegendaryStore.Entities;
    using LegendaryStore.Services;
    
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly StoreDbService _db;

        public ProductsController(StoreDbService dbService)
        {
            _db = dbService;
        }


        [HttpGet("by-category/{categoryId:int}")]
        public async Task<IActionResult> ByCategory([FromRoute]int categoryId)
        {
            var items = await _db.GetProductsAsync(categoryId);

            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get([FromRoute]int id)
        {
            var model = await _db.GetProductAsync(id);

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
