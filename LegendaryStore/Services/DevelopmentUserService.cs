using LegendaryStore.Abstractions;
using LegendaryStore.Models;

namespace LegendaryStore.Services
{
    public class DevelopmentUserService : IUserService
    {
        public UserInfo GetUserInfo()
        {
            return new UserInfo
            {
                UserName = "svasorcery",
                AvatarUrl = "http://bit.ly/2ELha0L"
            };
        }

        public string GetUserName()
        {
            return "svasorcery";
        }
    }
}
