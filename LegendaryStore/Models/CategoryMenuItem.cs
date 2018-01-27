using LegendaryStore.Entities;
using System.Collections.Generic;

namespace LegendaryStore.Models
{
    public class CategoryMenuItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public ICollection<CategoryMenuItem> Children { get; set; }
    }
}
