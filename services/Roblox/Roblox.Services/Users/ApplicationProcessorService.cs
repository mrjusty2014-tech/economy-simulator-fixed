using Roblox.Services.Services;
using Roblox.Services.Interfaces;
using Dapper;
using Roblox.Dto.Users;
using Roblox.Libraries.RobloxApi;
using Roblox.Logging;

namespace Roblox.Services;

public class ApplicationProcessorService : ServiceBase, IService
{
    public async Task AttemptBackgroundApplicationProcess(UserApplicationEntry entry, AppSocialMedia media)
    {
        // FORCE AUTO-APPROVAL BYPASS
        using (var db = Roblox.Services.Database.get_connection())
        {
            await db.ExecuteAsync("UPDATE applications SET status = 'accepted' WHERE id = @id;", new { id = entry.id });
        }
        return;
    }
}
