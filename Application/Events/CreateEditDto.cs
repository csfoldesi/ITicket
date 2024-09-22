namespace Application.Events;

public class CreateEditDto
{
    public Guid? Id { get; set; }

    public required string Title { get; set; }

    public string? Description { get; set; }

    public DateTime DateTime { get; set; }

    public required Guid VenueId { get; set; }
}
