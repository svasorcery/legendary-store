using LegendaryStore.DbContexts;
using LegendaryStore.Abstractions;

namespace LegendaryStore.Services
{
    public partial class StoreDbService
    {
        private readonly StoreDbContext _storeDb;
        private readonly IUserService _userService;

        public StoreDbService(
            StoreDbContext storeDbContext,
            IUserService userService
            )
        {
            _storeDb = storeDbContext;
            _userService = userService;
        }
    }
}
