using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlassaApi.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImgUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prenom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateCreation = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateNaissance = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sexe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tel1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tel2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumSerieTel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Methode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Platforme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Marque = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConditionsGenerales = table.Column<bool>(type: "bit", nullable: true),
                    Verifie = table.Column<bool>(type: "bit", nullable: true),
                    SuperDriver = table.Column<bool>(type: "bit", nullable: true),
                    NotesAvis = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
