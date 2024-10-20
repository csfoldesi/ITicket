namespace Application.Tickets;

public class TicketDto
{
    public Guid Id { get; set; }

    public Guid EventId { get; set; }

    public decimal Price { get; set; }

    public required string Status { get; set; }
}
