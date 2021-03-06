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
    /*
     * Route controlleer for /api/cases 
     */
    [Route("api/[controller]")]
    [ApiController]
    public class CasesController : ControllerBase
    {

        private readonly ICaseRepository _caseRepository;

        public CasesController(ICaseRepository caseRepository)
        {
            _caseRepository = caseRepository;
        }

        /*
         * GET route for all cases
         */
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

        /*
         * GET route for single case by id
         */
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

        /*
         * POST route for init of new case
         */
        [HttpPost]
        public ActionResult<Case> Post([FromBody] Case c)
        {
          try
          {
                Console.WriteLine("GOT HERER");
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

        /*
         * POST route for init of new person of interest
         */
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

        /*
         * PUT route for update of case state (Should be patch if following REST convention)
         */
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

        /*
         * DELETE route for case with given id
         */
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
