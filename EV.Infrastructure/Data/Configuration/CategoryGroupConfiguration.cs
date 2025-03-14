using EV.Domain.Constants;
using EV.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EV.Infrastructure.Data.Configuration
{
    public class CategoryGroupConfiguration : IEntityTypeConfiguration<CategoryGroup>
    {
        public void Configure(EntityTypeBuilder<CategoryGroup> builder)
        {
            builder
                .Property(p => p.Name)
                .HasMaxLength(FieldConstrants.Name)
                .IsRequired();
            builder.Property(p => p.Description)
                .HasMaxLength(FieldConstrants.Description);
            builder.HasMany(p => p.Categories)
                .WithOne(p => p.CategoryGroup)
                .HasForeignKey(p => p.GroupId);
            builder.HasKey(p => p.Id);
            builder
                .Property(p => p.CreatedBy)
                .IsRequired();
        }
    }
}
