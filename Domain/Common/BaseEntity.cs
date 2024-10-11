namespace Domain.Common;

public class BaseEntity
{
    public Guid Id { get; set; }

    public Boolean IsDeleted { get; set; }
}
