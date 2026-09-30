using Microsoft.EntityFrameworkCore;

public class VyaparSetuDbContext : DbContext
{
    public VyaparSetuDbContext(DbContextOptions<VyaparSetuDbContext> options)
        : base(options)
    {
    }

    public DbSet<Vendor> Vendors { get; set; }

    public DbSet<BusinessTransaction> BusinessTransactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BusinessTransaction>()
            .Property(t => t.Amount)
            .HasPrecision(18, 2);
    }
}