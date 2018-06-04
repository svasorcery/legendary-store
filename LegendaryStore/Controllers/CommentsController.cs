using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LegendaryStore.Controllers
{
    using LegendaryStore.Entities;
    using LegendaryStore.Services;
    
    [Authorize]
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        private readonly StoreDbService _db;

        public CommentsController(StoreDbService dbService)
        {
            _db = dbService;
        }


        [HttpGet("{productId:int}")]
        public async Task<IActionResult> Get([FromRoute]int productId)
        {
            var comments = await _db.GetCommentsAsync(productId);

            return Ok(comments);
        }

        [HttpPost("{productId:int}")]
        public async Task<IActionResult> Post([FromRoute]int productId, [FromBody]Comment comment)
        {
            var product = await _db.GetProductAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            comment.ProductId = product.Id;

            await _db.CreateCommentAsync(comment);

            return Ok(comment);
        }

        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete([FromRoute]long id)
        {
            try
            {
                await _db.DeleteCommentAsync(id);

                return Ok(new { deleted = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
