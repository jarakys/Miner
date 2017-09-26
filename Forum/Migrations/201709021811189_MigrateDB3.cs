namespace Forum.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB3 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Records", "Id", "dbo.Users");
            DropIndex("dbo.Records", new[] { "Id" });
            DropTable("dbo.Records");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Records",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.Records", "Id");
            AddForeignKey("dbo.Records", "Id", "dbo.Users", "Id");
        }
    }
}
