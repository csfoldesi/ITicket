using Application.Common;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Events;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly IDataContext _dataContext;

        public Handler(IDataContext dataContext)
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

            selectedEvent.IsDeleted = true;
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
