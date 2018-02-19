﻿// <auto-generated />
using LegendaryStore.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace LegendaryStore.Migrations
{
    [DbContext(typeof(StoreDbContext))]
    [Migration("20180219194454_Comments")]
    partial class Comments
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("LegendaryStore.Entities.CartItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("PriceCalculatedAt");

                    b.Property<decimal>("PricePerUnit");

                    b.Property<int>("ProductId");

                    b.Property<int>("Quantity");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("CartItems");
                });

            modelBuilder.Entity("LegendaryStore.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25);

                    b.Property<int?>("ParentId");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("LegendaryStore.Entities.Comment", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Author");

                    b.Property<string>("Content");

                    b.Property<bool>("IsDeleted");

                    b.Property<DateTime>("PostedAt");

                    b.Property<int>("ProductId");

                    b.HasKey("Id");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("LegendaryStore.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<string>("Description")
                        .HasMaxLength(500);

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<decimal>("Price");

                    b.Property<int>("Quantity")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0);

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("LegendaryStore.Entities.CartItem", b =>
                {
                    b.HasOne("LegendaryStore.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LegendaryStore.Entities.Category", b =>
                {
                    b.HasOne("LegendaryStore.Entities.Category", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId");
                });

            modelBuilder.Entity("LegendaryStore.Entities.Product", b =>
                {
                    b.HasOne("LegendaryStore.Entities.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
