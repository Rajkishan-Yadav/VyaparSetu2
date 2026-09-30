public class Vendor
{
    public int VendorId { get; set; }

    public string VendorName { get; set; } = "";

    public string? Phone { get; set; }

    public string? BusinessName { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}