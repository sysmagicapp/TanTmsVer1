using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ServiceStack.ServiceHost;
using ServiceStack.OrmLite;
using WebApi.ServiceModel.Tables;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
namespace WebApi.ServiceModel.TMS
{
    [Route("/tms/jmjm1", "Get")]  //DeliveryAgentCode=

    public class Jmjm : IReturn<CommonResponse>
    {
        public string DeliveryAgentCode { get; set; }

    }
    public class Jmjm_logic
    {
        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public List<Jmjm1> Get_Jmjm1_List(Jmjm request)
        {

            List<Jmjm1> Result = null;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
                {
                    string strSql = "";
                    string strWhere = " Where ( (select aeaw1.ArrivalDateTime from aeaw1 where aeaw1.JobNo=jmjm1.JobNo ) >=  getdate() "+
                                      "  or  (select aeaw1.ArrivalDateTime from aeaw1 where aeaw1.JobNo=jmjm1.JobNo ) ='' "+
                                      "  or (select aeaw1.ArrivalDateTime from aeaw1 where aeaw1.JobNo=jmjm1.JobNo ) is null ) " +
                                      //" And ModuleCode='AE' "+
                                      " And DeliveryAgentCode ='" + request.DeliveryAgentCode + "' ";
                             strSql = " select  JobNo, DeliveryAgentCode, ETA, Pcs, AwbBlNo, '' as UpdatedFlag,"+
                                      " (select isnull(aeaw1.ConsigneeAddress1,'') + isnull(aeaw1.ConsigneeAddress2,'') + isnull(ConsigneeAddress3,'') +isnull(aeaw1.ConsigneeAddress4,'') from aeaw1 where aeaw1.JobNo=jmjm1.JobNo  ) as Address," +
                                      " ConsigneeName ,(select top 1 Jmjm3.DateTime from jmjm3 where Jmjm3.JobNo=Jmjm1.JobNo and Jmjm3.Description = 'ACTUAL ARRIVAL DATE' order by Jmjm3.lineItemNo desc )  as  ActualArrivalDate, " +
                                      " (select aeaw1.ArrivalDateTime from aeaw1 where aeaw1.JobNo=jmjm1.JobNo ) as DeliveryDate " +
                                      " from jmjm1 "+ strWhere + " ";
                                Result = db.Select<Jmjm1>(strSql);

                }
            }
            catch { throw; }
            return Result;
        }
    }
}
