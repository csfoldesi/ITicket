namespace API.Dto;

public class ProfileDto
{
    public required string Email { get; set; }

    public List<string> Roles { get; set; } = [];
}
