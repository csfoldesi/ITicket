using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Tickets;

public class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public required CreateTicketDto CreateTicketDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly IDataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(IDataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var evt = await _dataContext.Events.FindAsync(
                [request.CreateTicketDto.EventId, cancellationToken]
            );
            var status = await _dataContext.TicketStatus.FirstOrDefaultAsync(
                x => x.Status == request.CreateTicketDto.Status,
                cancellationToken: cancellationToken
            );
            if (evt == null || status == null)
            {
                return Result<Unit>.Failure("Event not found, or invalud Status");
            }
            for (var i = 0; i < request.CreateTicketDto.Quantity; i++)
            {
                var ticket = new Ticket
                {
                    Id = Guid.NewGuid(),
                    Price = request.CreateTicketDto.Price,
                    Event = evt,
                    Status = status!,
                };
                _dataContext.Tickets.Add(ticket);
            }
            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                return Result<Unit>.Failure("Failed to create Ticket: " + ex.Message);
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
