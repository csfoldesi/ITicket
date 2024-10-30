using Domain.Common;

namespace Domain;

public class Ticket : IBaseEntity, IAuditableEntity
{
    public Guid Id { get; set; }

    public bool IsDeleted { get; set; }

    public DateTimeOffset Created { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset LastModified { get; set; }

    public string? LastModifiedBy { get; set; }

    public required TicketStatus Status { get; set; }

    public double Price { get; set; }

    public required Event Event { get; set; }
}
