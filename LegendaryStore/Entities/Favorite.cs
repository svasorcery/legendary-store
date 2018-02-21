using System;

namespace LegendaryStore.Entities
{
    public class Favorite
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string UserName { get; set; }
        public DateTime AddedAt { get; set; }
    }
}
