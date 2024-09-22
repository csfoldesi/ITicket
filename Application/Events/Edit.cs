using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events;

public class Edit
{
    public class Command : IRequest<Result<Event>>
    {
        public required CreateEditDto EventDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Event>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Result<Event>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var selectedEvent = await _dataContext.Events.FindAsync(
                [request.EventDto.Id],
                cancellationToken: cancellationToken
            );

            if (selectedEvent == null)
            {
                return Result<Event>.NotFound();
            }

            _mapper.Map(request.EventDto, selectedEvent);

            var venue = await _dataContext.Venues.FindAsync(request.EventDto.VenueId);
            if (venue == null)
            {
                return Result<Event>.Failure("Failed to update Event: Venue not found");
            }

            selectedEvent.Venue = venue;

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                return Result<Event>.Failure("Failed to update Event: " + ex.Message);
            }

            return Result<Event>.Success(selectedEvent);
        }
    }
}
