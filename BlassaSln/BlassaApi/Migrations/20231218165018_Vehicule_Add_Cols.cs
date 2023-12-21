using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlassaApi.Migrations
{
    /// <inheritdoc />
    public partial class Vehicule_Add_Cols : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateAssurance",
                table: "Vehicules",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateAssuranceProch",
                table: "Vehicules",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateVisiteTech",
                table: "Vehicules",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateVisiteTechProch",
                table: "Vehicules",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "FileAssurance",
                table: "Vehicules",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "FileCarteGrise",
                table: "Vehicules",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "FileVisiteTech",
                table: "Vehicules",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Image1",
                table: "Vehicules",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Image2",
                table: "Vehicules",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Image3",
                table: "Vehicules",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "VDateAssurance",
                table: "TrajetsAnnonces",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "VDateAssuranceProch",
                table: "TrajetsAnnonces",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "VDateVisiteTech",
                table: "TrajetsAnnonces",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "VDateVisiteTechProch",
                table: "TrajetsAnnonces",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "VFileAssurance",
                table: "TrajetsAnnonces",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "VFileCarteGrise",
                table: "TrajetsAnnonces",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "VFileVisiteTech",
                table: "TrajetsAnnonces",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "VImage1",
                table: "TrajetsAnnonces",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VehiculeId",
                table: "TrajetsAnnonces",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateAssurance",
                table: "Vehicules");

            migrationBuilder.DropColumn(
                name: "DateAssuranceProch",
                table: "Vehicules");

            migrationBuilder.DropColumn(
                name: "DateVisiteTech",
                table: "Vehicules");

            migrationBuilder.DropColumn(
                name: "DateVisiteTechProch",
                table: "Vehicules");

            migrationBuilder.DropColumn(
                name: "FileAssurance",
                table: "Vehicules");

            migrationBuilder.DropColumn(
                name: "FileCarteGrise",
                table: "Vehicules");

            migrationBuilder.DropColumn(
                name: "FileVisiteTech",
                table: "Vehicules");

            migrationBuilder.DropColumn(
                name: "Image1",
                table: "Vehicules");

            migrationBuilder.DropColumn(
                name: "Image2",
                table: "Vehicules");

            migrationBuilder.DropColumn(
                name: "Image3",
                table: "Vehicules");

            migrationBuilder.DropColumn(
                name: "VDateAssurance",
                table: "TrajetsAnnonces");

            migrationBuilder.DropColumn(
                name: "VDateAssuranceProch",
                table: "TrajetsAnnonces");

            migrationBuilder.DropColumn(
                name: "VDateVisiteTech",
                table: "TrajetsAnnonces");

            migrationBuilder.DropColumn(
                name: "VDateVisiteTechProch",
                table: "TrajetsAnnonces");

            migrationBuilder.DropColumn(
                name: "VFileAssurance",
                table: "TrajetsAnnonces");

            migrationBuilder.DropColumn(
                name: "VFileCarteGrise",
                table: "TrajetsAnnonces");

            migrationBuilder.DropColumn(
                name: "VFileVisiteTech",
                table: "TrajetsAnnonces");

            migrationBuilder.DropColumn(
                name: "VImage1",
                table: "TrajetsAnnonces");

            migrationBuilder.DropColumn(
                name: "VehiculeId",
                table: "TrajetsAnnonces");
        }
    }
}
