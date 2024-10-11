using Application.Common;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Venues.Query;

public class Get
{
    public class Query : IRequest<Result<Venue>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<Venue>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<Venue>> Handle(Query request, CancellationToken cancellationToken)
        {
            var venue = await _dataContext.Venues.FirstOrDefaultAsync(
                x => x.Id == request.Id && !x.IsDeleted,
                cancellationToken: cancellationToken
            );

            if (venue == null)
            {
                return Result<Venue>.NotFound();
            }

            return Result<Venue>.Success(venue);
        }
    }
}
