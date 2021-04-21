using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IViewRenderer
    {
        Task<string> RenderAsync<TModel>(Controller controller, string name, TModel model);
    }
}