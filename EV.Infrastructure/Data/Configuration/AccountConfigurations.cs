using EV.Domain.Constants;
using EV.Domain.Entities;
using EV.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EV.Infrastructure.Data.Configuration
{
    public class AccountConfigurations : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder
                 .HasKey(x => x.Id);
            builder
                .Property(x => x.Name)
                .HasMaxLength(FieldConstrants.Name)
                .IsRequired();
            builder
                .Property(x => x.Description)
                .HasMaxLength(FieldConstrants.Description);
            builder
                .Property(x => x.Avatar)
                .HasDefaultValue(FieldConstrants.DefaultAccountAvatar)
                .HasMaxLength(FieldConstrants.Avatar);
            builder
                .Property(x => x.IsDefault)
                .HasDefaultValue(false);
            builder
                .Property(x => x.IsDelete)
                .HasDefaultValue(false);
            builder
                .Property(x => x.UserId)
                .IsRequired();
            builder.Property(x => x.Balance)
                .HasColumnType(FieldConstrants.CurrencyDBType)
                .HasDefaultValue(0);
            builder
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
