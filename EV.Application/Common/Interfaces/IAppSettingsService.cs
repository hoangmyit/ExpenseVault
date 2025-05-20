using EV.Application.Common.Models.AppSetting;

namespace EV.Application.Common.Interfaces
{
    public interface IAppSettingsService
    {
        AppSettings GetAppSettings();
    }
}
