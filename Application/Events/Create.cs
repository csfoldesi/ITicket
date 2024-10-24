using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Events;

public class Create
{
    public class Command : IRequest<Result<Event>>
    {
        public required CreateEditDto EventDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Event>>
    {
        private readonly IDataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(IDataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Result<Event>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var venue = await _dataContext.Venues.FindAsync(request.EventDto.VenueId);
            if (venue == null)
            {
                return Result<Event>.Failure("Failed to create Event: Venue not found");
            }

            var newEvent = _mapper.Map<CreateEditDto, Event>(request.EventDto);
            newEvent.Venue = venue;

            _dataContext.Events.Add(newEvent);

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                return Result<Event>.Failure("Failed to create Event: " + ex.Message);
            }

            return Result<Event>.Success(newEvent);
        }
    }
}
