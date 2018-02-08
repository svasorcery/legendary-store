using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LegendaryStore.Controllers
{
    using LegendaryStore.Services;

    [Authorize]
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {
        private readonly StoreDbService _db;

        public CategoriesController(StoreDbService dbService)
        {
            _db = dbService;
        }


        public async Task<IActionResult> Get()
        {
            var tree = await _db.GetCategoriesMenuTreeAsync();

            return Ok(tree);
        }
    }
}
