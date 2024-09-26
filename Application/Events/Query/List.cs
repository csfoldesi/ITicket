﻿using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Query;

public class List
{
    public class Query : IRequest<Result<List<Event>>>
    {
        public required EventQueryParams QueryParams { get; set; }
    }

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
            var query = _dataContext.Events.Include(x => x.Venue) as IQueryable<Event>;
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

            var result = await query
                .OrderBy(x => x.DateTime)
                .ThenBy(x => x.Title)
                .ThenBy(x => x.Id)
                .ToListAsync();

            return Result<List<Event>>.Success(result);
        }
    }
}
