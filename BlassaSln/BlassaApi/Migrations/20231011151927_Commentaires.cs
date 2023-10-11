using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlassaApi.Migrations
{
    /// <inheritdoc />
    public partial class Commentaires : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "TrajetsAnnonces");

            migrationBuilder.CreateTable(
                name: "Commentaires",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    UserCommId = table.Column<int>(type: "int", nullable: false),
                    DateComm = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Texte = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Categorie = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commentaires", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commentaires_Users_UserCommId",
                        column: x => x.UserCommId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Commentaires_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Commentaires_UserCommId",
                table: "Commentaires",
                column: "UserCommId");

            migrationBuilder.CreateIndex(
                name: "IX_Commentaires_UserId",
                table: "Commentaires",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Commentaires");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "TrajetsAnnonces",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
