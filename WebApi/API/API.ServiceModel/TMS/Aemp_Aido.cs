using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ServiceStack.ServiceHost;
using ServiceStack.OrmLite;
using WebApi.ServiceModel.Tables;

namespace WebApi.ServiceModel.TMS
{
    [Route("/tms/aemp1withaido1", "Get")]
    [Route("/tms/aemp1withaido1/confirm", "Get")] //update?Key=,Remark=,TableName=
    public class Aemp_Aido : IReturn<CommonResponse>
    {
        public string Key { get; set; }
        public string Remark { get; set; }
        public string TableName { get; set; }
    }
    public class Aemp_Aido_Logic
    {
        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public List<Aemp1_Aido1> Get_Aemp1WithAido1_List(Aemp_Aido request)
        {

            List<Aemp1_Aido1> Result = null;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
                {
                    string strSql = "";
                    string strAemp1Where = "Where CONVERT(varchar(20),PickupDateTime ,112)=20120829";
                    string strAido1Where = "Where  CONVERT(varchar(20),DeliveryDate ,112)=20121129";
                    strSql = "  select cast(TrxNo as varchar(20)) as 'Key','Aemp1' as TableName, 'Collect' as DCFlag ,'N' as UpdatedFlag ,isnull((cast(pcs as nvarchar(20))+' ' +UomCode),'') as PcsUom ," +
                        "  PickupDateTime as TimeFrom  ,  DeliveryToName as DeliveryToName, DeliveryToAddress1 as DeliveryToAddress1 , " +
                        "  DeliveryToAddress2 as DeliveryToAddress2 ,DeliveryToAddress3 as DeliveryToAddress3 ,DeliveryToAddress4 as DeliveryToAddress4 , " +
                        "  GrossWeight as Weight,Volume ,isnull(DeliveryInstruction1,'') as DeliveryInstruction1, isnull(DeliveryInstruction2,'') as DeliveryInstruction2, " +
                        "  isnull(DeliveryInstruction3, '') as DeliveryInstruction3,Remark as Remark,AttachmentFlag as AttachmentFlag ,isnull(JobNo,'') as JobNo,StatusCode " +
                        "  from Aemp1 " + strAemp1Where + "" +
                        "  UNION all " +
                        "  select DeliveryOrderNo as 'Key','Aido1' as TableName, 'Deliver' as DCFlag ,'N' as UpdatedFlag ,isnull((cast(OriginalPcs as nvarchar(20)) + ' ' + OriginCode),'') as PcsUom , " +
                        "  DeliveryDate as TimeFrom  ,  DeliveryToName as DeliveryToName, DeliveryToAddress1 as DeliveryToAddress1 ,  " +
                        "  DeliveryToAddress2 as DeliveryToAddress2 ,DeliveryToAddress3 as DeliveryToAddress3 ,DeliveryToAddress4 as DeliveryToAddress4 , " +
                        "  Weight as Weight,0.0 as Volume ,isnull(DeliveryInstruction1,'') as DeliveryInstruction1, isnull(DeliveryInstruction2,'') as DeliveryInstruction2, " +
                        "  isnull(DeliveryInstruction3,'') as DeliveryInstruction3,Remark as Remark,AttachmentFlag as AttachmentFlag,isnull(JobNo,'') as JobNo,StatusCode" +
                        "  from Aido1   " + strAido1Where + "";
                    Result = db.Select<Aemp1_Aido1>(strSql);

                }
            }
            catch { throw; }
            return Result;

        }
        public int confirm_Aemp1WithAido1(Aemp_Aido request)
        {
            int Result = -1;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection())
                {
                    if (request.TableName == "Aemp1")
                    {

                        db.Update(request.TableName,
                            " Remark = '" + request.Remark + "',StatusCode = 'POD'",
                          " TrxNo='" + request.Key + "'");
                    }
                    else
                    {
                        db.Update(request.TableName,
                           " Remark = '" + request.Remark + "',StatusCode = 'POD'",
                          " DeliveryOrderNo='" + request.Key + "'");
                    }

                }

            }
            catch { throw; }
            return Result;
        }
    }
}
