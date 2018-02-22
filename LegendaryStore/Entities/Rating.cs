using System;

namespace LegendaryStore.Entities
{
    public class Rating
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string UserName { get; set; }
        public RatingRate Rate { get; set; }
        public DateTime RatedAt { get; set; }
    }

    public enum RatingRate
    {
        Poor = 1,
        Fair = 2,
        Average = 3,
        Good = 4,
        Excellent = 5
    }
}
