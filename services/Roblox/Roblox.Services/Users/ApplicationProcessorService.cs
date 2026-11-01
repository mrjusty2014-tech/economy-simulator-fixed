using Roblox.Dto.Users;

namespace Roblox.Services;

public class ApplicationProcessorService : ServiceBase, IService
{
    public async Task AttemptBackgroundApplicationProcess(UserApplicationEntry entry, AppSocialMedia media)
    {
        if (entry == null || string.IsNullOrWhiteSpace(entry.id))
            return;

        using var users = ServiceProvider.GetOrCreate<UsersService>();
        await users.ProcessApplication(entry.id, 1, UserApplicationStatus.Approved);
    }

    public bool IsThreadSafe()
    {
        return false;
    }

    public bool IsReusable()
    {
        return false;
    }
}
