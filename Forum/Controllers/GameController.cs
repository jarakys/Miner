using Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forum.Controllers
{
    public class GameController : Controller
    {
        UserContext db = new UserContext();

        public ActionResult Miner(string ids)
        {
            ViewBag.Types = ids;
            if (Request.IsAjaxRequest())
            {
                switch (ids)
                {
                    case "Noob":
                        {
                            return PartialView("_Noob");

                        }
                    case "Medium":
                        {
                            return PartialView("_Medium");
                        }
                    case "Hard":
                        {
                            return PartialView("_Hard");
                        }
                }
            }
            switch (ids)
            {
                case "Noob":
                    {
                        return View("Noob");

                    }
                case "Medium":
                    {
                        return View("Medium");
                    }
                case "Hard":
                    {
                        return View("Hard");
                    }
            }


            return View();
        }

    }
}