using Application.Common;

namespace Application.Events.Query;

public class EventQueryParams : PagedQuery
{
    public Guid? Venue { get; set; }

    public string? Title { get; set; }

    public DateTime? DateFrom { get; set; }

    public DateTime? DateTo { get; set; }

    public bool? IsOwnedOnly { get; set; }
}
