using Dapper;
using Roblox.Dto.Users;

namespace Roblox.Services;

public class ApplicationProcessorService : ServiceBase, IService
{
    public async Task AttemptBackgroundApplicationProcess(UserApplicationEntry entry, AppSocialMedia media)
    {
        // FORCE AUTO-APPROVAL BYPASS
        using (var db = Database.connection)
        {
            await db.ExecuteAsync("UPDATE applications SET status = 'accepted' WHERE id = @id;", new { id = entry.id });
        }
        return;
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
