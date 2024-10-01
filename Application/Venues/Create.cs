using Application.Common;
using Domain;
using MediatR;
using Persistence;

namespace Application.Venues;

public class Create
{
    public class Command : IRequest<Result<Venue>>
    {
        public required Venue Venue { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Venue>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<Venue>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            _dataContext.Venues.Add(request.Venue);
            var result = await _dataContext.SaveChangesAsync(cancellationToken);

            if (result == 0)
                return Result<Venue>.Failure("Failed to create Venue");

            return Result<Venue>.Success(request.Venue);
        }
    }
}
