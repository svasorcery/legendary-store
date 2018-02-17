using LegendaryStore.Models;

namespace LegendaryStore.Abstractions
{
    public interface IUserService
    {
        UserInfo GetUserInfo();
        string GetUserName();
    }
}
