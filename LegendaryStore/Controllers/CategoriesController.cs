using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LegendaryStore.Controllers
{
    using LegendaryStore.Services;

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
