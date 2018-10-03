using System.Collections.Generic;

namespace LegendaryStore.Common
{
    public class PagedList<T> : IPagedList<T>
    {
        public int Total {get; private set;}

        public int PageSize {get; private set;}

        public int PageIndex {get; private set;}

        public IEnumerable<T> Data {get; private set;}

        public PagedList(IEnumerable<T> source, int total, int pageSize, int pageIndex)
        {
            Data = source;
            Total = total;
            PageSize = pageSize;
            PageIndex = pageIndex;
        }

    }
}