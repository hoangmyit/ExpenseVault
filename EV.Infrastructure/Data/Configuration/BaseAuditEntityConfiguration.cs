using EV.Domain.Common;
using EV.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EV.Infrastructure.Data.Configuration
{
    public class BaseAuditEntityConfiguration<Tid> : IEntityTypeConfiguration<BaseAuditableEntity<Tid>>
    {
        public void Configure(EntityTypeBuilder<BaseAuditableEntity<Tid>> builder)
        {
            builder.Property(e => e.Created)
                .IsRequired();
            builder.Property(e => e.CreatedBy)
                .IsRequired();
            builder
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(e => e.CreatedBy)
                .OnDelete(DeleteBehavior.NoAction);
            builder
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(e => e.LastModifiedBy)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
