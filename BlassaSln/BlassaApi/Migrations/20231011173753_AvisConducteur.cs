using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlassaApi.Migrations
{
    /// <inheritdoc />
    public partial class AvisConducteur : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AvisConducteur",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    UserAviId = table.Column<int>(type: "int", nullable: false),
                    DateAvi = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Categorie = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvisConducteur", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AvisConducteur_Users_UserAviId",
                        column: x => x.UserAviId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AvisConducteur_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AvisConducteur_UserAviId",
                table: "AvisConducteur",
                column: "UserAviId");

            migrationBuilder.CreateIndex(
                name: "IX_AvisConducteur_UserId",
                table: "AvisConducteur",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AvisConducteur");
        }
    }
}
