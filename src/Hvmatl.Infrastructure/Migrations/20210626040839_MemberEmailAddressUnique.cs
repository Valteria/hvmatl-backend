using Microsoft.EntityFrameworkCore.Migrations;

namespace Hvmatl.Web.Migrations
{
    public partial class MemberEmailAddressUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "EmailAddress",
                table: "Member",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "11a6c277-15f3-4df4-bc61-3eaaaf69942c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "c8728999-0ae4-4710-b5ee-01f730cb5a35");

            migrationBuilder.CreateIndex(
                name: "IX_Member_EmailAddress",
                table: "Member",
                column: "EmailAddress",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Member_EmailAddress",
                table: "Member");

            migrationBuilder.AlterColumn<string>(
                name: "EmailAddress",
                table: "Member",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "3825df12-620f-4586-ba36-f98c41a79983");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "b719c95f-1a10-43a4-b407-ee72b7511132");
        }
    }
}
