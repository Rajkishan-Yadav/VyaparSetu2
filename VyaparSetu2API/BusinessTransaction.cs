public class BusinessTransaction
{
    public int BusinessTransactionId { get; set; }

    public string Type { get; set; } = "";

    public decimal Amount { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}