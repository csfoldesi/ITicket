using Application.Common;
using MediatR;
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

            _dataContext.Venues.Remove(venue);
            var result = await _dataContext.SaveChangesAsync(cancellationToken);

            if (result == 0)
                return Result<Unit>.Failure("Failed to delete Venue");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
