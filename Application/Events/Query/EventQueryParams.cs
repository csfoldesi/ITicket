using Application.Core;

namespace Application.Events.Query;

public class EventQueryParams : PagedQuery
{
    public Guid? Venue { get; set; }

    public DateTime? DateFrom { get; set; }

    public DateTime? DateTo { get; set; }
}
