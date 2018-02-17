using System;

namespace LegendaryStore.Entities
{
    public class CartItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public decimal PricePerUnit { get; set; }
        public DateTime PriceCalculatedAt { get; set; }
 
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public string UserName { get; set; }
    }
}
