using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events;

public class List
{
    public class Query : IRequest<Result<List<Event>>> { }

    public class Handler : IRequestHandler<Query, Result<List<Event>>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<List<Event>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var result = await _dataContext
                .Events.Include(x => x.Venue)
                .OrderBy(x => x.DateTime)
                .ThenBy(x => x.Title)
                .ThenBy(x => x.Id)
                .ToListAsync();

            return Result<List<Event>>.Success(result);
        }
    }
}
