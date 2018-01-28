using LegendaryStore.DbContexts;

namespace LegendaryStore.Services
{
    public partial class StoreDbService
    {
        private readonly StoreDbContext _storeDb;

        public StoreDbService(StoreDbContext storeDbContext)
        {
            _storeDb = storeDbContext;
        }
    }
}
