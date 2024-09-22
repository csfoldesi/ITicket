using Domain;

namespace Application.Core;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Venue, Venue>();
        CreateMap<Event, Event>();
        CreateMap<Events.CreateEditDto, Event>();
    }
}
