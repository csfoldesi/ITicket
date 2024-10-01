using Domain;

namespace Application.Common;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Venue, Venue>();
        CreateMap<Event, Event>();
        CreateMap<Events.CreateEditDto, Event>();
    }
}
