using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VyaparSetu2API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Existing Vendors table is already present in the database.
            // This migration only records the current database state.
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Do not delete the existing Vendors table.
        }
    }
}