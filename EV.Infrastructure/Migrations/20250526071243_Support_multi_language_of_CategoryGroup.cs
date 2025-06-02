using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EV.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Support_multi_language_of_CategoryGroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDelete",
                table: "Expenses",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "IsDelete",
                table: "Categories",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "IsDelete",
                table: "Accounts",
                newName: "IsDeleted");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "CategoryGroups",
                type: "NVARCHAR(MAX)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "CategoryGroups",
                type: "NVARCHAR(MAX)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Expenses",
                newName: "IsDelete");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Categories",
                newName: "IsDelete");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Accounts",
                newName: "IsDelete");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "CategoryGroups",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "NVARCHAR(MAX)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "CategoryGroups",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "NVARCHAR(MAX)");
        }
    }
}
