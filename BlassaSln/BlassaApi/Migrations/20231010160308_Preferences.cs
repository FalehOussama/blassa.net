using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlassaApi.Migrations
{
    /// <inheritdoc />
    public partial class Preferences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Preferences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Passager = table.Column<bool>(type: "bit", nullable: false),
                    Tel = table.Column<bool>(type: "bit", nullable: false),
                    WhatsApp = table.Column<bool>(type: "bit", nullable: false),
                    Messenger = table.Column<bool>(type: "bit", nullable: false),
                    VoyageAvec = table.Column<int>(type: "int", nullable: false),
                    Cigarette = table.Column<bool>(type: "bit", nullable: false),
                    Animaux = table.Column<bool>(type: "bit", nullable: false),
                    Max2 = table.Column<bool>(type: "bit", nullable: false),
                    Climatise = table.Column<bool>(type: "bit", nullable: false),
                    Leger = table.Column<bool>(type: "bit", nullable: false),
                    Moyen = table.Column<bool>(type: "bit", nullable: false),
                    Lourd = table.Column<bool>(type: "bit", nullable: false),
                    Verifies = table.Column<bool>(type: "bit", nullable: false),
                    Instantane = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Preferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Preferences_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Preferences_UserId",
                table: "Preferences",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Preferences");
        }
    }
}
