using EV.Domain.Constants;
using EV.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EV.Infrastructure.Data.Configuration
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(FieldConstrants.Name);
            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(FieldConstrants.Description);
            builder.Property(x => x.Avatar)
                .HasDefaultValue(FieldConstrants.DefaultCategoryAvatar)
                .HasMaxLength(FieldConstrants.Avatar);
            builder.Property(x => x.IsDefault)
                .IsRequired()
                .HasDefaultValue(false);
            builder.Property(x => x.IsDelete)
                .IsRequired()
                .HasDefaultValue(false);
            builder.HasOne(x => x.CategoryGroup)
                .WithMany(x => x.Categories)
                .HasForeignKey(x => x.GroupId);
        }
    }
}
