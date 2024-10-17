using Application.Common;

namespace Application.Venues.Query;

public class VenueQueryParams : PagedQuery
{
    public string? Name { get; set; }
}
