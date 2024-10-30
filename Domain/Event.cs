using Domain.Common;

namespace Domain;

public class Event : IBaseEntity, IAuditableEntity, IOwnedEntity
{
    public Guid Id { get; set; }

    public bool IsDeleted { get; set; }

    public DateTimeOffset Created { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset LastModified { get; set; }

    public string? LastModifiedBy { get; set; }

    public Guid OwnerId { get; set; }

    public required string Title { get; set; }

    public string? Description { get; set; }

    public DateTime DateTime { get; set; }

    public required Venue Venue { get; set; }

    public List<Ticket> Tickets { get; set; } = [];
}
