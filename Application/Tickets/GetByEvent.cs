using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Tickets
{
    public class GetByEvent
    {
        public class Query : IRequest<Result<List<TicketTypeDto>>>
        {
            public Guid EventId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<TicketTypeDto>>>
        {
            private readonly IDataContext _dataContext;

            public Handler(IDataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<List<TicketTypeDto>>> Handle(
                Query request,
                CancellationToken cancellationToken
            )
            {
                var result = await _dataContext
                    .Tickets.Where(ticket => ticket.Event.Id == request.EventId)
                    .GroupBy(ticket => ticket.Price)
                    .Select(group => new TicketTypeDto
                    {
                        Price = group.Key,
                        Quantity = group.Count(),
                    })
                    .OrderBy(t => t.Price)
                    .ToListAsync();

                return Result<List<TicketTypeDto>>.Success(result);
            }
        }
    }
}
