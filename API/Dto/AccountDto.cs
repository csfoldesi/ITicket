namespace API.Dto;

public class AccountDto
{
    public required string Id { get; set; }

    public required string Email { get; set; }

    public required string AccessToken { get; set; }

    public required string RefreshToken { get; set; }

    public List<string> Roles { get; set; } = [];
}
