namespace Forum.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB : DbMigration
    {
        public override void Up()
        {
           
            
            CreateTable(
                "dbo.tesrs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Records", "Id", "dbo.Users");
            DropIndex("dbo.Records", new[] { "Id" });
            DropTable("dbo.tesrs");
            DropTable("dbo.Users");
            DropTable("dbo.Records");
        }
    }
}
