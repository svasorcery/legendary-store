namespace LegendaryStore.Models
{
    public class CategoryListItem
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public CategoryListItem()
        {

        }

        public CategoryListItem(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
