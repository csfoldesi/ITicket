﻿using Application.Common;
using Application.Common.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Events.Query;

public class List
{
    public class Query : IRequest<Result<PagedList<Event>>>
    {
        public required EventQueryParams QueryParams { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PagedList<Event>>>
    {
        private readonly IDataContext _dataContext;

        public Handler(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<PagedList<Event>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var query = _dataContext
                .Events.Include(x => x.Venue)
                .Where(x => !x.IsDeleted && !x.Venue.IsDeleted);
            if (request.QueryParams.Venue != null)
            {
                query = query.Where(x => x.Venue.Id == request.QueryParams.Venue);
            }
            if (request.QueryParams.DateFrom != null)
            {
                query = query.Where(x => x.DateTime >= request.QueryParams.DateFrom);
            }
            if (request.QueryParams.DateTo != null)
            {
                query = query.Where(x => x.DateTime <= request.QueryParams.DateTo);
            }
            if (!string.IsNullOrEmpty(request.QueryParams.Title))
            {
                query = query.Where(x =>
                    x.Title.ToLower().Contains(request.QueryParams.Title.ToLower())
                );
            }

            var result = await query
                .OrderBy(x => x.DateTime)
                .ThenBy(x => x.Title)
                .ThenBy(x => x.Id)
                .PaginatedListAsync(request.QueryParams.PageNumber, request.QueryParams.PageSize);

            return Result<PagedList<Event>>.Success(result);
        }
    }
}
