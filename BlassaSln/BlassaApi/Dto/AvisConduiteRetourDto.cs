using BlassaApi.Models;

namespace BlassaApi.Dto
{
    public class AvisConduiteRetourDto
    {
        public int NbreTotal { get; set; }
        public List<AviConducteur>? Avis { get; set; }
    }
}
