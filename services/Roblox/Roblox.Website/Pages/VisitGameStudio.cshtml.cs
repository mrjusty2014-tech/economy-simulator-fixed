namespace Roblox.Website.Pages;

public class VisitGameStudio : RobloxPageModel
{
    public void OnGet()
    {
        HttpContext.Response.Headers.ContentType = "text/plain";
    }
}