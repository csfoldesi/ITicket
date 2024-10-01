using Application.Common;
using Domain;
using MediatR;
using Persistence;

namespace Application.Venues.Query;

public class List
{
    public class Query : IRequest<Result<PagedList<Venue>>>
    {
        public required VenueQueryParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PagedList<Venue>>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<PagedList<Venue>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var result = await _dataContext
                .Venues.OrderBy(x => x.Name)
                .ThenBy(x => x.Id)
                .PaginatedListAsync(request.Params.PageNumber, request.Params.PageSize);

            return Result<PagedList<Venue>>.Success(result);
        }
    }
}
