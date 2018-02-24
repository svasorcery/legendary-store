﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LegendaryStore.Controllers
{
    using LegendaryStore.Entities;
    using LegendaryStore.Services;

    [Authorize]
    [Route("api/[controller]")]
    public class RatingsController : Controller
    {
        private readonly StoreDbService _db;

        public RatingsController(StoreDbService dbService)
        {
            _db = dbService;
        }


        [HttpGet("{productId:int}")]
        public async Task<IActionResult> Get([FromRoute]int productId)
        {
            var product = await _db.GetProductAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            var item = await _db.GetRatingAsync(product.Id);

            return Ok(item);
        }

        [HttpPost("rate/{productId:int}")]
        public async Task<IActionResult> Rate([FromRoute]int productId, [FromBody]RatingPost rating)
        {
            var product = await _db.GetProductAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            var item = await _db.RateProductAsync(product, rating.Rate);

            return Ok(item);
        }


        public class RatingPost
        {
            public int ProductId { get; set; }
            public RatingRate Rate { get; set; }
        }
    }
}
