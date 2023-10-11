using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlassaApi.Migrations
{
    /// <inheritdoc />
    public partial class TrajetsAnnonces : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TrajetsAnnonces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Depart = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LonDepart = table.Column<float>(type: "real", nullable: false),
                    LatDepart = table.Column<float>(type: "real", nullable: false),
                    Destination = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LonDestination = table.Column<float>(type: "real", nullable: false),
                    LatDestination = table.Column<float>(type: "real", nullable: false),
                    DateHeureDepart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Prix = table.Column<int>(type: "int", nullable: false),
                    NombrePlaces = table.Column<int>(type: "int", nullable: false),
                    Tel = table.Column<bool>(type: "bit", nullable: false),
                    WhatsApp = table.Column<bool>(type: "bit", nullable: false),
                    Messenger = table.Column<bool>(type: "bit", nullable: false),
                    VoyageAvec = table.Column<int>(type: "int", nullable: false),
                    Cigarette = table.Column<bool>(type: "bit", nullable: false),
                    Animaux = table.Column<bool>(type: "bit", nullable: false),
                    Max2 = table.Column<bool>(type: "bit", nullable: false),
                    Leger = table.Column<bool>(type: "bit", nullable: false),
                    Moyen = table.Column<bool>(type: "bit", nullable: false),
                    Lourd = table.Column<bool>(type: "bit", nullable: false),
                    Verifies = table.Column<bool>(type: "bit", nullable: false),
                    Instantane = table.Column<bool>(type: "bit", nullable: false),
                    VMatricule = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VModele = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VMarque = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VClimatise = table.Column<bool>(type: "bit", nullable: false),
                    VVerifie = table.Column<bool>(type: "bit", nullable: false),
                    VCouleur = table.Column<int>(type: "int", nullable: false),
                    VTypeVehicule = table.Column<int>(type: "int", nullable: false),
                    VMiseEnCirculation = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateCreation = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrajetsAnnonces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrajetsAnnonces_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrajetsAnnonces_UserId",
                table: "TrajetsAnnonces",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrajetsAnnonces");
        }
    }
}
