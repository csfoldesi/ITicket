﻿namespace API.Dto;

public class CreateAccountDto
{
    public required string Email { get; set; }

    public required string Password { get; set; }
}