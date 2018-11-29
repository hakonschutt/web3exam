using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Repositories;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public List<User> Get()
        {
            return null;
        }

        [HttpGet("{id}")]
        public User Get(Guid id)
        {
          return new UserRepository().GetById(id);
        }

        [HttpPost]
        public void Post([FromBody] string data)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string data)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
