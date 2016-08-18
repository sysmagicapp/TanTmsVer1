using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApi.ServiceModel;
using WebApi.ServiceModel.TMS;

namespace WebApi.ServiceInterface.TMS
{
    public class TableService
    {
        public void TS_AempWithAido1(Auth auth, Aemp_Aido request, Aemp_Aido_Logic aemp_aido_logic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {

                if (uri.IndexOf("/tms/aemp1withaido1/confirm") > 0)
                {
                    ecr.data.results = aemp_aido_logic.confirm_Aemp1WithAido1(request);
                }
                else if (uri.IndexOf("/tms/aemp1withaido1/update") > 0)
                {
                    ecr.data.results = aemp_aido_logic.UpdateAll_Aemp1WithAido1(request);
                }
                else if (uri.IndexOf("/tms/aemp1withaido1") > 0)
                {
                    ecr.data.results = aemp_aido_logic.Get_Aemp1WithAido1_List(request);
                }
                ecr.meta.code = 200;
                ecr.meta.message = "OK";
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }
        }

        public void TS_Rcbp(Auth auth, Rcbp request, Rcbp_Logic rcbp_logic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {
                if (uri.IndexOf("/tms/rcbp1") > 0)
                {
                    ecr.data.results = rcbp_logic.Get_rcbp1_List(request);
                }
                ecr.meta.code = 200;
                ecr.meta.message = "OK";
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }
        }

        public void TS_Jmjm(Auth auth, Jmjm request, Jmjm_logic jmjm_logic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {
                if (uri.IndexOf("/tms/jmjm1/confirm") > 0)
                {
                    ecr.data.results = jmjm_logic.ConfirmAll_Jmjm1(request);
                }
               else if (uri.IndexOf("/tms/jmjm1") > 0)
                {
                    ecr.data.results = jmjm_logic.Get_Jmjm1_List(request);
                }
                ecr.meta.code = 200;
                ecr.meta.message = "OK";
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }
        }


        public void DownLoadImg(Auth auth, DownLoadImg request, DownLoadImg_Logic logic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {
                if (uri.IndexOf("/tms/aemp1withaido1/attach") > 0)
                {
                    ecr.data.results = logic.Get_Jmjm1_Attach_List(request);
                }
                if (uri.IndexOf("/tms/jmjm1/doc") > 0)
                {
                    //ecr.data.results = logic.Get_Jmjm1_Doc_List(request);
                }
                ecr.meta.code = 200;
                ecr.meta.message = "OK";
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }
        }

    }
}
