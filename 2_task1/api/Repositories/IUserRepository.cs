using System;
using System.Collections.Generic;
using api.Models;

namespace api.Repositories
{
    public interface IUserRepository
    {
        User GetById(Guid id);
        List<User> GetAll();
        bool Remove(Guid id);
        bool Save(User user);
    }
}
