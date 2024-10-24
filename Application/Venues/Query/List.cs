﻿using Application.Common;
using Application.Common.Interfaces;
using Domain;
using MediatR;

namespace Application.Venues.Query;

public class List
{
    public class Query : IRequest<Result<PagedList<Venue>>>
    {
        public required VenueQueryParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PagedList<Venue>>>
    {
        private readonly IDataContext _dataContext;

        public Handler(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<PagedList<Venue>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var query = _dataContext.Venues.Where(x => !x.IsDeleted);
            if (!string.IsNullOrEmpty(request.Params.Name))
            {
                query = query.Where(x => x.Name.ToLower().Contains(request.Params.Name.ToLower()));
            }

            query = query.OrderBy(x => x.Name).ThenBy(x => x.Id);

            var result = await query.PaginatedListAsync(
                request.Params.PageNumber,
                request.Params.PageSize
            );

            return Result<PagedList<Venue>>.Success(result);
        }
    }
}
