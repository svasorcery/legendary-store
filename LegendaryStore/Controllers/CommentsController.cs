using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LegendaryStore.Controllers
{
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
        public async Task<IActionResult> Get(int productId)
        {
            var comments = await _db.GetCommentsAsync(productId);

            return Ok(comments);
        }
    }
}
