using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Venues;

public class List
{
    public class Query : IRequest<Result<List<Venue>>> { }

    public class Handler : IRequestHandler<Query, Result<List<Venue>>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<List<Venue>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var result = await _dataContext
                .Venues.OrderBy(x => x.Name)
                .ThenBy(x => x.Id)
                .ToListAsync();

            return Result<List<Venue>>.Success(result);
        }
    }
}
