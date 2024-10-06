using Domain;

namespace Application.Venues;

public class CreateEditDto
{
    public Guid? Id { get; set; }

    public required string Name { get; set; }

    public string? Description { get; set; }

    public required Address Address { get; set; }
}
