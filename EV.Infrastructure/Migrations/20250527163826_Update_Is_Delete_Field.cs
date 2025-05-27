using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EV.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Update_Is_Delete_Field : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CategoryGroups",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CategoryGroups");
        }
    }
}
