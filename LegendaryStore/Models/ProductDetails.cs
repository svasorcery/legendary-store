using LegendaryStore.Entities;

namespace LegendaryStore.Models
{
    public class ProductDetails
    {
        public Product Product { get; set; }
        public bool IsFavorite { get; set; }
        public float RatingTotal { get; set; }
        public RatingRate? RatingByUser { get; set; }
    }
}
