﻿using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using Domain.Interfaces;
using MediatR;

namespace Application.Events;

public class Create
{
    public class Command : IRequest<Result<Event>>
    {
        public required CreateEditDto EventDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Event>>
    {
        private readonly IDataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IUser _user;

        public Handler(IDataContext dataContext, IMapper mapper, IUser user)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _user = user;
        }

        public async Task<Result<Event>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var venue = await _dataContext.Venues.FindAsync(request.EventDto.VenueId);
            if (venue == null)
            {
                return Result<Event>.Failure("Failed to create Event: Venue not found");
            }

            var newEvent = _mapper.Map<CreateEditDto, Event>(request.EventDto);
            newEvent.Venue = venue;
            newEvent.OwnerId = new Guid(_user.Id!);

            _dataContext.Events.Add(newEvent);

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                return Result<Event>.Failure("Failed to create Event: " + ex.Message);
            }

            return Result<Event>.Success(newEvent);
        }
    }
}
