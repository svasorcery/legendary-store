using LegendaryStore.Entities;
using System.Collections.Generic;

namespace LegendaryStore.Models
{
    public class ProductsList
    {
        public string CategoryName { get; set; }

        public IEnumerable<Product> Items { get; set; }

        public Paging Paging { get; set; }
    }
}
