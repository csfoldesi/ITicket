using Application.Venues;
using Application.Venues.Query;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VenuesController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVenue(Guid id)
        {
            var result = await Mediator.Send(new Get.Query { Id = id });
            return HandleResult(result);
        }

        [HttpGet]
        public async Task<IActionResult> ListVenues([FromQuery] VenueQueryParams queryParams)
        {
            var result = await Mediator.Send(new List.Query { Params = queryParams });
            return HandleResult(result);
        }

        [Authorize]
        [HttpGet("owned")]
        public async Task<IActionResult> ListVenuesOwned([FromQuery] VenueQueryParams queryParams)
        {
            var result = await Mediator.Send(
                new List.Query { Params = queryParams, IsOwnedOnly = true }
            );
            return HandleResult(result);
        }

        [Authorize(Roles = "Admin,TicketManager")]
        [HttpPost]
        public async Task<IActionResult> CreateVenue(CreateEditDto venueDto)
        {
            var result = await Mediator.Send(new Create.Command { VenueDto = venueDto });
            return HandleResult(result);
        }

        [Authorize(Policy = "IsVenueOwner")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenue(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });
            return HandleResult(result);
        }

        [Authorize(Policy = "IsVenueOwner")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditVenue(Guid id, CreateEditDto venueDto)
        {
            venueDto.Id = id;
            var result = await Mediator.Send(new Edit.Command { VenueDto = venueDto });
            return HandleResult(result);
        }
    }
}
