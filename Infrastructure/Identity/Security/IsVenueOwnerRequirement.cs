using System.Security.Claims;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Identity.Security;

public class IsVenueOwnerRequirement : IAuthorizationRequirement { }

public class IsVenueOwnerHandler : AuthorizationHandler<IsVenueOwnerRequirement>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly DataContext _dataContext;

    public IsVenueOwnerHandler(IHttpContextAccessor httpContextAccessor, DataContext dataContext)
    {
        _httpContextAccessor = httpContextAccessor;
        _dataContext = dataContext;
    }

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        IsVenueOwnerRequirement requirement
    )
    {
        if (context.User == null)
            return Task.CompletedTask;

        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Task.CompletedTask;

        var venueId = Guid.Parse(
            _httpContextAccessor
                .HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id")
                .Value?.ToString()!
        );

        if (_dataContext.Venues.Any(x => x.Id == venueId && x.CreatedBy == userId))
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
