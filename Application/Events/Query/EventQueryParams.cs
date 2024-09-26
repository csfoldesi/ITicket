namespace Application.Events.Query;

public class EventQueryParams
{
    public Guid? Venue { get; set; }

    public DateTime? DateFrom { get; set; }

    public DateTime? DateTo { get; set; }
}
