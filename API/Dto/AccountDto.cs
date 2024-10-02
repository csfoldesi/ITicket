namespace API.Dto;

public class AccountDto
{
    public required string Id { get; set; }

    public required string Email { get; set; }

    public string? Token { get; set; }
}
