using Domain.Common;

namespace Domain;

public class TicketStatus : IBaseEntity
{
    public Guid Id { get; set; }

    public bool IsDeleted { get; set; }

    public required string Status { get; set; }
}
