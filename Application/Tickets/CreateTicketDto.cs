namespace Application.Tickets;

public class CreateTicketDto
{
    public required Guid EventId { get; set; }

    public double Price { get; set; }

    public int? Quantity { get; set; } = 1;

    public string? Status { get; set; } = "DEFAULT";
}
