using Domain.Common;

namespace Domain;

public class Ticket : BaseAuditableEntity
{
    public required TicketStatus Status { get; set; }

    public double Price { get; set; }

    public required Event Event { get; set; }
}
