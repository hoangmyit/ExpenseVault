using EV.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace EV.Infrastructure.Data.Configuration
{
    public class CategoryGroupConfiguration : IEntityTypeConfiguration<CategoryGroup>
    {
        public void Configure(EntityTypeBuilder<CategoryGroup> builder)
        {
            builder
                .Property(p => p.Name)
                   .IsRequired()
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                    v => JsonSerializer.Deserialize<Dictionary<string, string>>(v, (JsonSerializerOptions)null) ?? new Dictionary<string, string>())
                .HasColumnType("NVARCHAR(MAX)");
            builder.Property(p => p.Description)
                .IsRequired()
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                    v => JsonSerializer.Deserialize<Dictionary<string, string>>(v, (JsonSerializerOptions)null) ?? new Dictionary<string, string>())
                .HasColumnType("NVARCHAR(MAX)");
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
