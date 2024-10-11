using Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Venues;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var venue = await _dataContext.Venues.FindAsync(request.Id);

            if (venue == null)
            {
                return Result<Unit>.NotFound();
            }

            venue.IsDeleted = true;
            var venueEvents = await _dataContext
                .Events.Where(x => x.Venue.Id == request.Id)
                .ToListAsync(cancellationToken: cancellationToken);
            venueEvents.ForEach(x => x.IsDeleted = true);

            var result = await _dataContext.SaveChangesAsync(cancellationToken);

            if (result == 0)
                return Result<Unit>.Failure("Failed to delete Venue");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
