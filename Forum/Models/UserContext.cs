using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Forum.Models
{
    public class UserContext : DbContext
    {
        public UserContext()
            : base("DbConnection1")
        { }
        public DbSet<User> Users { get; set; }
        public DbSet<tesr> tesrs { get; set; }
        //   public DbSet<Purchase> Purchases { get; set; }

    }
}