using Domain.Common;

namespace Domain;

public class Venue : BaseAuditableEntity
{
    public required string Name { get; set; }

    public string? Description { get; set; }

    public required Address Address { get; set; }
}
