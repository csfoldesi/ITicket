namespace API.Middleware;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        await _next(context);

        /*if (context.Response.StatusCode == (int)HttpStatusCode.NotFound)
        {
            await HandleNotFoundAsync(context);
        }*/
    }

    /*private Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var errorResponse = new ErrorResponse
        {
            Message = "An unexpected error occurred.",
            Details = ex.Message,
        };

        return context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
    }*/

    /*private static Task HandleNotFoundAsync(HttpContext context)
    {
        //context.Response.ContentType = "application/json";
        //context.Response.StatusCode = (int)HttpStatusCode.NotFound;

        var response = ApiResponse<string>.Failure("The requested resource could not be found.");

        return context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }*/
}
