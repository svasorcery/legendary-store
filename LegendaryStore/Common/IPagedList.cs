namespace LegendaryStore.Common
{
    public interface IPagedList<T>
    {
        int Total {get;}
        int PageSize {get;}
        int PageIndex {get;}
    }
}