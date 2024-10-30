using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using Domain.Interfaces;
using MediatR;

namespace Application.Venues;

public class Create
{
    public class Command : IRequest<Result<Venue>>
    {
        public required CreateEditDto VenueDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Venue>>
    {
        private readonly IDataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IUser _user;

        public Handler(IDataContext dataContext, IMapper mapper, IUser user)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _user = user;
        }

        public async Task<Result<Venue>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var venue = _mapper.Map<CreateEditDto, Venue>(request.VenueDto);
            venue.OwnerId = new Guid(_user.Id!);

            _dataContext.Venues.Add(venue);
            var result = await _dataContext.SaveChangesAsync(cancellationToken);

            if (result == 0)
                return Result<Venue>.Failure("Failed to create Venue");

            return Result<Venue>.Success(venue);
        }
    }
}
