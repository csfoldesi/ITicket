﻿namespace Domain.Common;

public interface IOwnedEntity
{
    Guid OwnerId { get; set; }
}
