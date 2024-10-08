using Application.Events;
using Application.Events.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class EventsController : BaseApiController
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetEvent(Guid id)
    {
        var result = await Mediator.Send(new Get.Query { Id = id });
        return HandleResult(result);
    }

    [HttpGet]
    public async Task<IActionResult> ListEvents([FromQuery] EventQueryParams queryParams)
    {
        var result = await Mediator.Send(new List.Query { QueryParams = queryParams });
        return HandleResult(result);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateEvent(CreateEditDto eventDto)
    {
        var result = await Mediator.Send(new Create.Command { EventDto = eventDto });
        return HandleResult(result);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(Guid id)
    {
        var result = await Mediator.Send(new Delete.Command { Id = id });
        return HandleResult(result);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> EditEvent(Guid id, CreateEditDto eventDto)
    {
        eventDto.Id = id;
        var result = await Mediator.Send(new Edit.Command { EventDto = eventDto });
        return HandleResult(result);
    }
}
