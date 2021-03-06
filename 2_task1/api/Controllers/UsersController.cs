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
    public class UsersController : ControllerBase
    {

        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
          try
          {
              return StatusCode(200, _userRepository.GetAll());
          }
          catch (Exception ex)
          {
              return StatusCode(500, ex.Message);
          }
        }

        [HttpGet("{id}")]
        public ActionResult<User> Get(Guid id)
        {
            try
            {
                var user = _userRepository.GetById(id);

                if (user == null) {
                    return StatusCode(404, null);
                }

                return StatusCode(200, user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<User> Post([FromBody] User user)
        {
          try
          {
              user.id = new Guid();

              if (_userRepository.Save(user)) {
                return StatusCode(201, user);
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
                if (_userRepository.Remove(id)) {
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
