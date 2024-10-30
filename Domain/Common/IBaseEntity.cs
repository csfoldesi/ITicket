namespace Domain.Common;

public interface IBaseEntity
{
    Guid Id { get; set; }

    Boolean IsDeleted { get; set; }
}
