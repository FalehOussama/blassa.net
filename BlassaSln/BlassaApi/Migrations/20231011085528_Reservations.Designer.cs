﻿// <auto-generated />
using System;
using BlassaApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BlassaApi.Migrations
{
    [DbContext(typeof(BlassaContext))]
    [Migration("20231011085528_Reservations")]
    partial class Reservations
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BlassaApi.Models.Preferences", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Animaux")
                        .HasColumnType("bit");

                    b.Property<bool>("Cigarette")
                        .HasColumnType("bit");

                    b.Property<bool>("Climatise")
                        .HasColumnType("bit");

                    b.Property<bool>("Instantane")
                        .HasColumnType("bit");

                    b.Property<bool>("Leger")
                        .HasColumnType("bit");

                    b.Property<bool>("Lourd")
                        .HasColumnType("bit");

                    b.Property<bool>("Max2")
                        .HasColumnType("bit");

                    b.Property<bool>("Messenger")
                        .HasColumnType("bit");

                    b.Property<bool>("Moyen")
                        .HasColumnType("bit");

                    b.Property<bool>("Passager")
                        .HasColumnType("bit");

                    b.Property<bool>("Tel")
                        .HasColumnType("bit");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<bool>("Verifies")
                        .HasColumnType("bit");

                    b.Property<int>("VoyageAvec")
                        .HasColumnType("int");

                    b.Property<bool>("WhatsApp")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Preferences");
                });

            modelBuilder.Entity("BlassaApi.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateReservation")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("TrajetAnnonceId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TrajetAnnonceId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("BlassaApi.Models.TrajetAnnonce", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Animaux")
                        .HasColumnType("bit");

                    b.Property<bool>("Cigarette")
                        .HasColumnType("bit");

                    b.Property<DateTime>("DateCreation")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateHeureDepart")
                        .HasColumnType("datetime2");

                    b.Property<string>("Depart")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Destination")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Instantane")
                        .HasColumnType("bit");

                    b.Property<float>("LatDepart")
                        .HasColumnType("real");

                    b.Property<float>("LatDestination")
                        .HasColumnType("real");

                    b.Property<bool>("Leger")
                        .HasColumnType("bit");

                    b.Property<float>("LonDepart")
                        .HasColumnType("real");

                    b.Property<float>("LonDestination")
                        .HasColumnType("real");

                    b.Property<bool>("Lourd")
                        .HasColumnType("bit");

                    b.Property<bool>("Max2")
                        .HasColumnType("bit");

                    b.Property<bool>("Messenger")
                        .HasColumnType("bit");

                    b.Property<bool>("Moyen")
                        .HasColumnType("bit");

                    b.Property<int>("NombrePlaces")
                        .HasColumnType("int");

                    b.Property<int>("Prix")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<bool>("Tel")
                        .HasColumnType("bit");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<bool>("VClimatise")
                        .HasColumnType("bit");

                    b.Property<int>("VCouleur")
                        .HasColumnType("int");

                    b.Property<string>("VMarque")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VMatricule")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("VMiseEnCirculation")
                        .HasColumnType("datetime2");

                    b.Property<string>("VModele")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VTypeVehicule")
                        .HasColumnType("int");

                    b.Property<bool>("VVerifie")
                        .HasColumnType("bit");

                    b.Property<bool>("Verifies")
                        .HasColumnType("bit");

                    b.Property<int>("VoyageAvec")
                        .HasColumnType("int");

                    b.Property<bool>("WhatsApp")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("TrajetsAnnonces");
                });

            modelBuilder.Entity("BlassaApi.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("ConditionsGenerales")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("DateCreation")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateNaissance")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImgUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Marque")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Methode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("NotesAvis")
                        .HasColumnType("real");

                    b.Property<string>("NumSerieTel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Platforme")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prenom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Sexe")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("SuperDriver")
                        .HasColumnType("bit");

                    b.Property<string>("Tel1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tel2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Verifie")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BlassaApi.Models.Vehicule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Climatise")
                        .HasColumnType("bit");

                    b.Property<int>("Couleur")
                        .HasColumnType("int");

                    b.Property<string>("Marque")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Matricule")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("MiseEnCirculation")
                        .HasColumnType("datetime2");

                    b.Property<string>("Modele")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TypeVehicule")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<bool>("Verifie")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Vehicules");
                });

            modelBuilder.Entity("BlassaApi.Models.Preferences", b =>
                {
                    b.HasOne("BlassaApi.Models.User", null)
                        .WithOne("Preferences")
                        .HasForeignKey("BlassaApi.Models.Preferences", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BlassaApi.Models.Reservation", b =>
                {
                    b.HasOne("BlassaApi.Models.TrajetAnnonce", null)
                        .WithMany("Reservations")
                        .HasForeignKey("TrajetAnnonceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BlassaApi.Models.User", null)
                        .WithMany("Reservations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("BlassaApi.Models.TrajetAnnonce", b =>
                {
                    b.HasOne("BlassaApi.Models.User", null)
                        .WithMany("TrajetsAnnonces")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BlassaApi.Models.Vehicule", b =>
                {
                    b.HasOne("BlassaApi.Models.User", null)
                        .WithMany("Vehicules")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BlassaApi.Models.TrajetAnnonce", b =>
                {
                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("BlassaApi.Models.User", b =>
                {
                    b.Navigation("Preferences");

                    b.Navigation("Reservations");

                    b.Navigation("TrajetsAnnonces");

                    b.Navigation("Vehicules");
                });
#pragma warning restore 612, 618
        }
    }
}
