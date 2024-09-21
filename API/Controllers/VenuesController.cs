using Application.Venues;
using Domain;
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
        public async Task<IActionResult> ListVenues()
        {
            var result = await Mediator.Send(new List.Query());
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVenue(Venue venue)
        {
            var result = await Mediator.Send(new Create.Command { Venue = venue });
            return HandleResult(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenue(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });
            return HandleResult(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditVenue(Guid id, Venue venue)
        {
            venue.Id = id;
            var result = await Mediator.Send(new Edit.Command { Venue = venue });
            return HandleResult(result);
        }
    }
}
