using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Venues;

public class Edit
{
    public class Command : IRequest<Result<Venue>>
    {
        public required CreateEditDto VenueDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Venue>>
    {
        private readonly IDataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(IDataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Result<Venue>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var venue = await _dataContext.Venues.FindAsync(request.VenueDto.Id);

            if (venue == null)
            {
                return Result<Venue>.NotFound();
            }

            _mapper.Map(request.VenueDto, venue);

            var result = await _dataContext.SaveChangesAsync(cancellationToken);

            if (result == 0)
                return Result<Venue>.Failure("Failed to update Venue");

            return Result<Venue>.Success(venue);
        }
    }
}
