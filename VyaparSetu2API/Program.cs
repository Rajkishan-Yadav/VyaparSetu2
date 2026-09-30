
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// CORS - Allow frontend to connect to API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<VyaparSetuDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

builder.Services.AddOpenApi();

var app = builder.Build();

// Enable CORS
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/", () => "VyaparSetu2 API is running!");

app.MapGet("/api/vendors", async (VyaparSetuDbContext db) =>
{
    return await db.Vendors.ToListAsync();
});

app.MapPost("/api/vendors", async (Vendor vendor, VyaparSetuDbContext db) =>
{
    vendor.CreatedAt = DateTime.Now;

    db.Vendors.Add(vendor);
    await db.SaveChangesAsync();

    return Results.Ok(vendor);
});
// Get all Transactions
app.MapGet("/api/transactions", async (VyaparSetuDbContext db) =>
{
    return await db.BusinessTransactions
        .OrderByDescending(t => t.CreatedAt)
        .ToListAsync();
});

// Add Transaction
app.MapPost("/api/transactions", async (BusinessTransaction transaction, VyaparSetuDbContext db) =>
{
    transaction.CreatedAt = DateTime.Now;

    db.BusinessTransactions.Add(transaction);
    await db.SaveChangesAsync();

    return Results.Ok(transaction);
});
app.Run();

