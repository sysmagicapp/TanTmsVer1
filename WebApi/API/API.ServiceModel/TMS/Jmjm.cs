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
    [Route("/tms/jmjm1/confirm", "Post")] //

    public class Jmjm : IReturn<CommonResponse>
    {
        public string DeliveryAgentCode { get; set; }
        public string confirmAllString { get; set; }
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
                                      " And ModuleCode='AE' "+
                                      " And DeliveryAgentCode ='" + request.DeliveryAgentCode + "' ";
                             strSql = " select  JobNo, DeliveryAgentCode,CONVERT(varchar(100), ETA, 21) as ETA , Pcs, AwbBlNo, '' as UpdatedFlag," +
                                      " (select isnull(aeaw1.ConsigneeAddress1,'') + isnull(aeaw1.ConsigneeAddress2,'') + isnull(ConsigneeAddress3,'') +isnull(aeaw1.ConsigneeAddress4,'') from aeaw1 where aeaw1.JobNo=jmjm1.JobNo  ) as Address," +
                                      " ConsigneeName ,CONVERT(varchar(100), (select top 1 Jmjm3.DateTime from jmjm3 where Jmjm3.JobNo=Jmjm1.JobNo and Jmjm3.Description = 'ACTUAL ARRIVAL DATE' order by Jmjm3.lineItemNo desc ), 21)  as  ActualArrivalDate, " +
                                      " CONVERT(varchar(100), (select aeaw1.ArrivalDateTime from aeaw1 where aeaw1.JobNo=jmjm1.JobNo ), 21) as DeliveryDate " +
                                      " from jmjm1 "+ strWhere + " ";
                                Result = db.Select<Jmjm1>(strSql);

                }
            }
            catch { throw; }
            return Result;
        }
        public int ConfirmAll_Jmjm1(Jmjm request)
        {
            int Result = -1;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection())
                {
                    if (request.confirmAllString != null && request.confirmAllString != "")
                    {
                        JArray ja = (JArray)JsonConvert.DeserializeObject(request.confirmAllString);
                        if (ja != null)
                        {
                            for (int i = 0; i < ja.Count(); i++)
                            {                                                        
                                    string strJobNo = "";
                                string strActualArrivalDate = "";
                                string strDeliveryDate = "";
                                if (ja[i]["JobNo"] != null || ja[i]["JobNo"].ToString() != "")
                                        strJobNo = ja[i]["JobNo"].ToString();
                                          strActualArrivalDate = ja[i]["ActualArrivalDate"].ToString();
                                         strDeliveryDate = ja[i]["DeliveryDate"].ToString();
                                if (strJobNo != "")
                                    {

                                    db.Update("Jmjm3",
                                      " DateTime = '" + Modfunction.SQLSafe(strActualArrivalDate) + "'",
                                      " JobNo='" + strJobNo + "' and Description = 'ACTUAL ARRIVAL DATE'");

                                    db.Update("Aeaw1",
                                      " ArrivalDateTime = '" + Modfunction.SQLSafe(strDeliveryDate) + "'",
                                              " JobNo='" + strJobNo + "'");

                                }
                            }
                            Result = 1;
                        }
                    }
                }
            }
            catch { throw; }
            return Result;
        }



    }
}
