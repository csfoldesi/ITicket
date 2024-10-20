using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security;

public class IsEventOwnerRequirement : IAuthorizationRequirement { }

public class IsEventOwnerHandler : AuthorizationHandler<IsEventOwnerRequirement>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly DataContext _dataContext;

    public IsEventOwnerHandler(IHttpContextAccessor httpContextAccessor, DataContext dataContext)
    {
        _httpContextAccessor = httpContextAccessor;
        _dataContext = dataContext;
    }

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        IsEventOwnerRequirement requirement
    )
    {
        if (context.User == null)
            return Task.CompletedTask;

        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Task.CompletedTask;

        var eventId = Guid.Parse(
            _httpContextAccessor
                .HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id")
                .Value?.ToString()!
        );

        if (_dataContext.Events.Any(x => x.Id == eventId && x.CreatedBy == userId))
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
