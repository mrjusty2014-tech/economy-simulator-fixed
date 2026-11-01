using Roblox.Website.Filters;

namespace Roblox.Website.Pages;

public class Home : RobloxPageModel
{
    public bool isStaff { get; private set; }

    public async Task OnGetAsync()
    {
        var currentUser = userSession;
        isStaff = currentUser != null && await StaffFilter.IsStaff(currentUser.userId);
    }
}