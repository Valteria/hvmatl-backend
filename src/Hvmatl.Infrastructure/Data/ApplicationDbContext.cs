﻿using Hvmatl.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hvmatl.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Member>().HasIndex(m => m.EmailAddress).IsUnique();
            modelBuilder.Entity<Department>().HasIndex(d => d.Name).IsUnique();

            // One To Many Relationship (Department -> Member)
            modelBuilder.Entity<Department>()
                        .HasMany(d => d.Members)
                        .WithOne(d => d.Department)
                        .HasForeignKey(d => d.DepartmentID);

            modelBuilder.Entity<IdentityRole<int>>().HasData(
                new IdentityRole<int> { Id = 1, Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole<int> { Id = 2, Name = "User", NormalizedName = "USER" }
            );
        }
        
        public DbSet<Member> Member { get; set; }
        public DbSet<Department> Department { get; set; }
    }
}
