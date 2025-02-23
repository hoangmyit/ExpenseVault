using EV.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EV.Infrastructure.Data.Configuration
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(200);
            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(500);
            builder.Property(x => x.Avatar)
                .HasMaxLength(500);
            builder.Property(x => x.IsDefault)
                .IsRequired()
                .HasDefaultValue(false);
            builder.Property(x => x.IsDelete)
                .IsRequired()
                .HasDefaultValue(false);
        }
    }
}
