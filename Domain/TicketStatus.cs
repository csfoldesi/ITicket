using Domain.Common;

namespace Domain;

public class TicketStatus : BaseEntity
{
    public required string Status { get; set; }
}
