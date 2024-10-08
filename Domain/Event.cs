using Domain.Common;

namespace Domain;

public class Event : BaseAuditableEntity
{
    public required string Title { get; set; }

    public string? Description { get; set; }

    public DateTime DateTime { get; set; }

    public required Venue Venue { get; set; }
}
