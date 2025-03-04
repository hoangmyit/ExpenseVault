using EV.Application.Common.Interface;
using EV.Application.Common.Model;
using Microsoft.Extensions.Configuration;

namespace EV.Infrastructure.Services
{
    public class AppSettingsService : IAppSettingsService
    {
        private readonly AppSettings _appSettings;

        public AppSettingsService(IConfiguration configuration)
        {
            _appSettings = new AppSettings();
            configuration.Bind(_appSettings);
        }

        public AppSettings GetAppSettings()
        {
            return _appSettings;
        }
    }
}
