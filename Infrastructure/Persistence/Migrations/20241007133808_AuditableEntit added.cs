using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AuditableEntitadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Created",
                table: "Venues",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTimeOffset(
                    new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                    new TimeSpan(0, 0, 0, 0, 0)
                )
            );

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Venues",
                type: "TEXT",
                nullable: true
            );

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LastModified",
                table: "Venues",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTimeOffset(
                    new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                    new TimeSpan(0, 0, 0, 0, 0)
                )
            );

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "Venues",
                type: "TEXT",
                nullable: true
            );

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Created",
                table: "Events",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTimeOffset(
                    new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                    new TimeSpan(0, 0, 0, 0, 0)
                )
            );

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Events",
                type: "TEXT",
                nullable: true
            );

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LastModified",
                table: "Events",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTimeOffset(
                    new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                    new TimeSpan(0, 0, 0, 0, 0)
                )
            );

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "Events",
                type: "TEXT",
                nullable: true
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "Created", table: "Venues");

            migrationBuilder.DropColumn(name: "CreatedBy", table: "Venues");

            migrationBuilder.DropColumn(name: "LastModified", table: "Venues");

            migrationBuilder.DropColumn(name: "LastModifiedBy", table: "Venues");

            migrationBuilder.DropColumn(name: "Created", table: "Events");

            migrationBuilder.DropColumn(name: "CreatedBy", table: "Events");

            migrationBuilder.DropColumn(name: "LastModified", table: "Events");

            migrationBuilder.DropColumn(name: "LastModifiedBy", table: "Events");
        }
    }
}
