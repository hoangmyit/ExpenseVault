using EV.Application.Common.Exceptions;
using EV.Application.Common.Interfaces;
using EV.Application.Common.Models.AppSetting;
using EV.Application.Common.Validators.AppSetting;
using Microsoft.Extensions.Configuration;

namespace EV.Infrastructure.Services
{
    public class AppSettingsService : IAppSettingsService
    {
        private readonly AppSettings _appSettings;

        public AppSettingsService(IConfiguration configuration)
        {
            _appSettings = new AppSettings
            {
                ConnectionStrings = null!,
                Jwt = null!,
                Logging = null!,
                EmailSetting = null!,
                DevelopmentSetting = null!,
                AppUrl = null!,
                ServerUrl = null!,
            };
            configuration.Bind(_appSettings);
            var validator = new AppSettingValidator();
            var validationResult = validator.Validate(_appSettings);
            if (!validationResult.IsValid)
            {
                throw new CustomValidationException(validationResult.Errors);
            }
        }

        public AppSettings GetAppSettings()
        {
            return _appSettings;
        }
    }
}
