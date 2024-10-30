using Application.Tickets;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class TicketsController : BaseApiController
{
    [Authorize(Roles = "Admin,TicketManager")]
    [HttpPost]
    public async Task<IActionResult> CreateTicket(CreateTicketDto createTicketDto)
    {
        var result = await Mediator.Send(new Create.Command { CreateTicketDto = createTicketDto });
        return HandleResult(result);
    }
}
