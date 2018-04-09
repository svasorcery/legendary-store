using System;
using System.IO;
using System.Net.Http.Headers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;

namespace LegendaryStore.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class FilesController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public FilesController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }


        [HttpPost, DisableRequestSizeLimit]
        public IActionResult UploadFile()
        {
            try
            {
                var folderName = "images";
                var webRootPath = _hostingEnvironment.WebRootPath;
                var newPath = Path.Combine(webRootPath, folderName);
                var urlBasePath = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}/{folderName}";

                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }

                var urls = new List<string>();

                foreach (var file in Request.Form.Files)
                {
                    if (file.Length > 0)
                    {
                        string fileName = Guid.NewGuid().ToString() + ".jpg"; //ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        string fullPath = Path.Combine(newPath, fileName);
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }

                        urls.Add($"{urlBasePath}/{fileName}");
                    }
                }

                return Ok(new { message = "Upload Successful.", urls });
            }
            catch (Exception ex)
            {
                return BadRequest("Upload Failed: " + ex.Message);
            }
        }
    }
}
