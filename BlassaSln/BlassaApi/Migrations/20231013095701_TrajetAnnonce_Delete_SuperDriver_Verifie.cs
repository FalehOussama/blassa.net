using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlassaApi.Migrations
{
    /// <inheritdoc />
    public partial class TrajetAnnonce_Delete_SuperDriver_Verifie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "USuperDriver",
                table: "TrajetsAnnonces");

            migrationBuilder.DropColumn(
                name: "UVerifie",
                table: "TrajetsAnnonces");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "USuperDriver",
                table: "TrajetsAnnonces",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "UVerifie",
                table: "TrajetsAnnonces",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
