using EV.Domain.Constants;
using EV.Domain.Entities;
using EV.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EV.Infrastructure.Data.Configuration
{
    public class ExpenseConfiguration : IEntityTypeConfiguration<Expense>
    {
        public void Configure(EntityTypeBuilder<Expense> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Amount)
                .HasColumnType(FieldConstrants.CurrencyDBType);
            builder.Property(builder => builder.Description)
                .HasMaxLength(FieldConstrants.Description);
            builder.Property(builder => builder.IsPlan)
                .HasDefaultValue(false);
            builder.Property(builder => builder.IsTransfer)
                .HasDefaultValue(false);
            builder.Property(builder => builder.Name)
                .HasMaxLength(FieldConstrants.Name)
                .IsRequired();
            builder.Property(builder => builder.Avatar)
                .HasDefaultValue(FieldConstrants.DefaultExpenseAvatar)
                .HasMaxLength(FieldConstrants.Avatar);

            builder
                .HasOne(builder => builder.Category)
                .WithMany()
                .HasForeignKey(builder => builder.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
            builder
                .HasOne(builder => builder.Account)
                .WithMany()
                .HasForeignKey(builder => builder.AccountId)
                .OnDelete(DeleteBehavior.NoAction);
            builder
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(builder => builder.UserId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
