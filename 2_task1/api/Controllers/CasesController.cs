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

        public UsersController(ICaseRepository caseRepository)
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
                var case = _caseRepository.GetById(id);

                if (case == null) {
                    return StatusCode(404, null);
                }

                return StatusCode(200, case);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Case> Post([FromBody] Case case)
        {
          try
          {
              case.id = new Guid();

              if (_caseRepository.Save(case)) {
                return StatusCode(201, case);
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
        public ActionResult<bool> Put(Guid id, [FromBody] Case case)
        {
            try
            {
                if (_caseRepository.Update(id, case)) {
                  return StatusCode(200, case);
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
