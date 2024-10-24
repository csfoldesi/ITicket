using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class TicketRenamedToTickets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Ticket_Events_EventId", table: "Ticket");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_TicketStatus_StatusId",
                table: "Ticket"
            );

            migrationBuilder.DropPrimaryKey(name: "PK_Ticket", table: "Ticket");

            migrationBuilder.RenameTable(name: "Ticket", newName: "Tickets");

            migrationBuilder.RenameIndex(
                name: "IX_Ticket_StatusId",
                table: "Tickets",
                newName: "IX_Tickets_StatusId"
            );

            migrationBuilder.RenameIndex(
                name: "IX_Ticket_EventId",
                table: "Tickets",
                newName: "IX_Tickets_EventId"
            );

            migrationBuilder.AddPrimaryKey(name: "PK_Tickets", table: "Tickets", column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Events_EventId",
                table: "Tickets",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade
            );

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_TicketStatus_StatusId",
                table: "Tickets",
                column: "StatusId",
                principalTable: "TicketStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Tickets_Events_EventId", table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_TicketStatus_StatusId",
                table: "Tickets"
            );

            migrationBuilder.DropPrimaryKey(name: "PK_Tickets", table: "Tickets");

            migrationBuilder.RenameTable(name: "Tickets", newName: "Ticket");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_StatusId",
                table: "Ticket",
                newName: "IX_Ticket_StatusId"
            );

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_EventId",
                table: "Ticket",
                newName: "IX_Ticket_EventId"
            );

            migrationBuilder.AddPrimaryKey(name: "PK_Ticket", table: "Ticket", column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Events_EventId",
                table: "Ticket",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade
            );

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_TicketStatus_StatusId",
                table: "Ticket",
                column: "StatusId",
                principalTable: "TicketStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade
            );
        }
    }
}
