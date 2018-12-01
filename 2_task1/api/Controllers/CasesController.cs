using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Repositories;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CasesController : ControllerBase
    {

        private readonly ICaseRepository _caseRepository;

        public CasesController(ICaseRepository caseRepository)
        {
            _caseRepository = caseRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Case>> Get()
        {
          try
          {
              return StatusCode(200, _caseRepository.GetAll());
          }
          catch (Exception ex)
          {
              return StatusCode(500, ex.Message);
          }
        }

        [HttpGet("{id}")]
        public ActionResult<Case> Get(Guid id)
        {
            try
            {
                var c = _caseRepository.GetById(id);

                if (c == null) {
                    return StatusCode(404, null);
                }

                return StatusCode(200, c);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Case> Post([FromBody] Case c)
        {
          try
          {
              c.id = new Guid();

              if (_caseRepository.Save(c)) {
                return StatusCode(201, c);
              } else {
                return StatusCode(422, null);
              }
          }
          catch (Exception ex)
          {
              return StatusCode(500, ex.Message);
          }
        }

        [HttpPost("{id}/persons")]
        public ActionResult<bool> PostPerson(Guid id, [FromBody] string data)
        {
          try
          {
              if (_caseRepository.AddPerson(id, data)) {
                return StatusCode(201, null);
              } else {
                return StatusCode(422, null);
              }
          }
          catch (Exception ex)
          {
              return StatusCode(500, ex.Message);
          }
        }

        [HttpPut("{id}")]
        public ActionResult<Case> Put(Guid id, [FromBody] Case c)
        {
            try
            {
                if (_caseRepository.Update(id, c)) {
                  return StatusCode(200, c);
                } else {
                  return StatusCode(422, null);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(Guid id)
        {
            try
            {
                if (_caseRepository.Remove(id)) {
                  return StatusCode(200, null);
                } else {
                  return StatusCode(404, null);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
