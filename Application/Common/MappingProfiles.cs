using Application.Tickets;
using Domain;

namespace Application.Common;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Venue, Venue>();
        CreateMap<Event, Event>();
        CreateMap<Events.CreateEditDto, Event>();
        CreateMap<Venues.CreateEditDto, Venue>();
        CreateMap<Ticket, TicketDto>()
            .ForMember(t => t.EventId, ex => ex.MapFrom(t => t.Event.Id))
            .ForMember(t => t.Status, ex => ex.MapFrom(t => t.Status.Status));
    }
}
