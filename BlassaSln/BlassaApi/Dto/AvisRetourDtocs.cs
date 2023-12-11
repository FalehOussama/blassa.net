using BlassaApi.Models;

namespace BlassaApi.Dto
{
    public class AvisRetourDtocs
    {
        public int NbreTotal { get; set; }
        public List<Avi>? Avis { get; set; }
    }
}
