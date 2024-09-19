using Microsoft.EntityFrameworkCore;

namespace Domain;

public class Address
{
    public required string Country { get; set; }

    public required string ZipCode { get; set; }

    public required string City { get; set; }

    public required string Street { get; set; }
}
