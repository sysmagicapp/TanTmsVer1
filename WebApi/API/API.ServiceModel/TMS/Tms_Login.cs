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
      
        public string DriverCode { get; set; }
<<<<<<< HEAD
        public string DriverName { get; set; }
        public string CustomerCode { get; set; }　
        public string Password { get; set; }
       
=======
        public string BusinessPartyCode { get; set; }
        public string PassWord { get; set; }
   
>>>>>>> 7bac6931098c20f1fece4557da282620e08bcc8b
    }
    public class Tms_Login_Logic
    {    
        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public List<Todr1_Rcbp1> LoginCheck(Tms_Login request)
        {
            
            List<Todr1_Rcbp1> Result = null; 
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
                {
                    string strSql = "";
                    if (request.DriverCode != null && request.DriverCode.Length > 0)
<<<<<<< HEAD
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
=======
>>>>>>> 7bac6931098c20f1fece4557da282620e08bcc8b
                    {
                        strSql = "Select isnull(DriverCode,'') as  DriverCode   From Todr1 Where DriverCode='" + request.DriverCode + "' ";
                        Result = db.Select<Todr1_Rcbp1>(strSql);
                    }
                    else if (request.BusinessPartyCode != null && request.BusinessPartyCode.Length > 0 &&  request.BusinessPartyCode != null && request.BusinessPartyCode.Length > 0)
                    {
                        strSql = "Select isnull(BusinessPartyCode,'') as  BusinessPartyCode ,isnull(PassWord,'') as  PassWord From Rcbp1 Where BusinessPartyCode='" + request.BusinessPartyCode + "' And PassWord ='"+request.PassWord+"' ";
                        Result = db.Select<Todr1_Rcbp1>(strSql);
                    }
<<<<<<< HEAD
=======
       
>>>>>>> 7bac6931098c20f1fece4557da282620e08bcc8b
                }
            }
            catch { throw; }
            return Result;

        }

  



    }
}
