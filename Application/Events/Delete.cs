using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events;

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
            var selectedEvent = await _dataContext.Events.FindAsync(request.Id);

            if (selectedEvent == null)
            {
                return Result<Unit>.NotFound();
            }

            _dataContext.Events.Remove(selectedEvent);

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                return Result<Unit>.Failure("Failed to delete Event: " + ex.Message);
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
