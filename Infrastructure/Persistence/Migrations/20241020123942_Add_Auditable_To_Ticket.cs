using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Add_Auditable_To_Ticket : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Created",
                table: "Tickets",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTimeOffset(
                    new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                    new TimeSpan(0, 0, 0, 0, 0)
                )
            );

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Tickets",
                type: "TEXT",
                nullable: true
            );

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LastModified",
                table: "Tickets",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTimeOffset(
                    new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                    new TimeSpan(0, 0, 0, 0, 0)
                )
            );

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "Tickets",
                type: "TEXT",
                nullable: true
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "Created", table: "Tickets");

            migrationBuilder.DropColumn(name: "CreatedBy", table: "Tickets");

            migrationBuilder.DropColumn(name: "LastModified", table: "Tickets");

            migrationBuilder.DropColumn(name: "LastModifiedBy", table: "Tickets");
        }
    }
}
