using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebApi.ServiceModel.Tables
{
   public class Jmjm1
    {


        public string JobNo { get; set; }
        public string DeliveryAgentCode { get; set; }
        public DateTime ETA { get; set; }
        public int Pcs { get; set; }
        public string AwbBlNo { get; set; }
        public string UpdatedFlag { get; set; }
        public string Address { get; set; }   
        public string ConsigneeName { get; set; }
        public DateTime ActualArrivalDate { get; set; }
        public DateTime DeliveryDate { get; set; }

    }
}
