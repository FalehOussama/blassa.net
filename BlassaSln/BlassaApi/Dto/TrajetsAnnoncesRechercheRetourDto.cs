﻿using BlassaApi.Models;

namespace BlassaApi.Dto
{
    public class TrajetsAnnoncesRechercheRetourDto
    {
        public TrajetsAnnoncesRechercheRetourDto()
        {
            Trajets = new List<TrajetAnnonce>();
        }
        public List<TrajetAnnonce> Trajets { get; set; }
        public int Count { get; set; }
        public int NbreAvant6H { get; set; }
        public int NbreEntre6H12H { get; set; }
        public int NbreEntre12H18H { get; set; }
        public int NbreApres18H { get; set; }
        public int NbreSuperDriver { get; set; }
        public int NbreProfilVerifie { get; set; }
        public int NbreMax2Arriere { get; set; }
        public int NbreReservationInst { get; set; }
        public int NbreBLeger { get; set; }
        public int NbreBMoyen { get; set; }
        public int NbreBLourd { get; set; }
        public int NbreClimatisation { get; set; }
        public int NbreCigaretteAuto { get; set; }
        public int NbreAnimauxAuto { get; set; }
    }
}
