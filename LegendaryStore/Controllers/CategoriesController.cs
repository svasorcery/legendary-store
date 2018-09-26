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


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tree = await _db.GetRootCategoriesChildsTreeAsync();

            return Ok(tree);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get([FromRoute]int id)
        {
            var model = await _db.GetCategoryAsync(id);

            return Ok(model);
        }

        [HttpGet("{id:int}/children")]
        public async Task<IActionResult> Children(int id)
        {
            var tree = await _db.GetCategoryChildsTreeAsync(id);

            return Ok(tree);
        }

        [HttpGet("{id:int}/parents")]
        public async Task<IActionResult> Parents(int id)
        {
            var tree = await _db.GetCategoryParentsTreeAsync(id);

            return Ok(tree);
        }
    }
}
