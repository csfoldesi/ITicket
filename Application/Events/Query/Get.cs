using Application.Common;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Query;

public class Get
{
    public class Query : IRequest<Result<Event>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<Event>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<Event>> Handle(Query request, CancellationToken cancellationToken)
        {
            var result = await _dataContext
                .Events.Where(x => x.Id == request.Id && !x.IsDeleted)
                .Include(x => x.Venue)
                .Where(x => !x.Venue.IsDeleted)
                .FirstOrDefaultAsync(cancellationToken);

            if (result == null)
            {
                return Result<Event>.NotFound();
            }

            return Result<Event>.Success(result);
        }
    }
}
