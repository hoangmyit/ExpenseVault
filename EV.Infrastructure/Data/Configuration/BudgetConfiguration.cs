using EV.Domain.Constants;
using EV.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EV.Infrastructure.Data.Configuration
{
    public class BudgetConfiguration : IEntityTypeConfiguration<Budget>
    {
        public void Configure(EntityTypeBuilder<Budget> builder)
        {
            builder.Property(b => b.BudgetLimit)
                .HasColumnType(FieldConstants.CurrencyDBType)
                .IsRequired();
            builder.Property(b => b.UserId)
                .IsRequired();
            builder.Property(b => b.CategoryId)
                .IsRequired();
            builder.HasOne(b => b.Category);
            builder.HasIndex(b => new { b.UserId, b.CategoryId })
                .IsUnique();

        }
    }
}
