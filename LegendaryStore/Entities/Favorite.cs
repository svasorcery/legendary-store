using System;

namespace LegendaryStore.Entities
{
    public class Favorite
    {
        public long Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string UserName { get; set; }
        public DateTime AddedAt { get; set; }
    }
}
