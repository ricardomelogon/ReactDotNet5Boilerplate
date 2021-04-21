using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class ConfigDaysLimitDto
    {
        public int Limit { get; set; }
    }

    public class ConfigWithdrawMinimumDto
    {
        [JsonPropertyName("minimum")]
        public decimal Minimum { get; set; }
    }

    public class ConfigPercentageDto
    {
        [JsonPropertyName("percentage")]
        public decimal Percentage { get; set; }
    }
}
