using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ServiceStack.ServiceHost;
using ServiceStack.OrmLite;
using WebApi.ServiceModel.Tables;

namespace WebApi.ServiceModel.TMS
{
    [Route("/tms/login/check", "Get")]
    public class Tms_Login : IReturn<CommonResponse>
    {
        //public string UserId { get; set; }　　　//20160511 注释
        //public string Password { get; set; }
        //public string Md5Stamp { get; set; }
        public string ContactNo { get; set; }
        public string DriverCode { get; set; }
        public string DriverName { get; set; }
        public string CustomerCode { get; set; }　
        public string Password { get; set; }
       
    }
    public class Tms_Login_Logic
    {
        public Boolean BlnContactNo = true;
        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public List<Todr1> LoginCheck(Tms_Login request)
        {
            
            List<Todr1> Result = null; ;    //20160511 
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
                {
                    if (request.DriverCode != null && request.DriverCode.Length > 0)
                    {
                        string strSql = "Select isnull(DriverName,'') as  DriverName ,isnull(VehicleNo,'') as VehicleNo,'' AS CustomerCode,'' AS Password From Todr1 Where DriverCode='" + Modfunction.SQLSafe(request.DriverCode) + "' ";
                        Result = db.Select<Todr1>(strSql);
                    }
                    if (request.CustomerCode != null && request.CustomerCode.Length > 0)
                    {
                        if (request.Password != null && request.Password.Length > 0)
                        {
                            string strSql = "Select '' as  DriverCode ,'' as  DriverName ,'' as  VehicleNo,Password From rcbp1 Where BusinessPartyCode ='" + Modfunction.SQLSafe(request.DriverCode) + "' AND Password = '" + Modfunction.SQLSafe(request.DriverCode) + "'";
                            Result = db.Select<Todr1>(strSql);
                        }                       
                    }
       
                }
            }
            catch { throw; }
            return Result;

        }

        public List<Todr1> GetTodr1(Tms_Login request)    //20160511 
        {
            List<Todr1> Result = null;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
                {

                    var strSQL = "";
                    if (BlnContactNo == false)
                    {
                        strSQL = "select isnull(DriverCode,'') as  DriverCode,isnull(DriverName,'') as  DriverName from todr1 where ContactNo2=" + Modfunction.SQLSafeValue(request.ContactNo);
                        Result = db.Select<Todr1>(strSQL);
                    }
                    else
                    {
                        strSQL = "select isnull(DriverCode,'') as  DriverCode,isnull(DriverName,'') as  DriverName from todr1 where ContactNo1=" + Modfunction.SQLSafeValue(request.ContactNo);
                        Result = db.Select<Todr1>(strSQL);
                    }
                }
            }
            catch { throw; }
            return Result;

        }



    }
}
