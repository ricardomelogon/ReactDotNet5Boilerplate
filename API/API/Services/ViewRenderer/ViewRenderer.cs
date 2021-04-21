using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System;
using System.IO;
using System.Threading.Tasks;

namespace API.Services
{
    public class ViewRenderer : IViewRenderer
    {
        private readonly IRazorViewEngine viewEngine;
        private readonly IErrorLogService errorLogService;

        public ViewRenderer(IRazorViewEngine viewEngine, IErrorLogService errorLogService)
        {
            this.viewEngine = viewEngine;
            this.errorLogService = errorLogService;
        }

        public async Task<string> RenderAsync<TModel>(Controller controller, string name, TModel model)
        {
            try
            {
                if (controller == null) throw new Exception("Could not find controller");
                ViewEngineResult viewEngineResult = viewEngine.FindView(controller.ControllerContext, name, false);

                if (!viewEngineResult.Success) throw new InvalidOperationException($"Could not find view: {name}");
                IView view = viewEngineResult.View;
                controller.ViewData.Model = model;

                await using StringWriter writer = new StringWriter();
                ViewContext viewContext = new ViewContext(
                   controller.ControllerContext,
                   view,
                   controller.ViewData,
                   controller.TempData,
                   writer,
                   new HtmlHelperOptions());

                await view.RenderAsync(viewContext);

                return writer.ToString();
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e); throw;
            }
        }
    }
}