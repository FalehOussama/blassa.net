using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlassaApi.Migrations
{
    /// <inheritdoc />
    public partial class TrajetsAnnoncesStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "TrajetsAnnonces",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "TrajetsAnnonces");
        }
    }
}
