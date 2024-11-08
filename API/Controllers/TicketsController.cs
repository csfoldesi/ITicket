using Application.Tickets;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class TicketsController : BaseApiController
{
    [Authorize(Roles = "Admin,TicketManager", Policy = "IsEventOwner")]
    [HttpPost("{id}")]
    public async Task<IActionResult> CreateTicket(Guid id, CreateTicketDto createTicketDto)
    {
        createTicketDto.EventId = id;
        var result = await Mediator.Send(new Create.Command { CreateTicketDto = createTicketDto });
        return HandleResult(result);
    }
}
