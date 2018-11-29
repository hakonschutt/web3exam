using System;
using System.Collections.Generic;
using api.Models;

namespace api.Repositories
{
    public interface IUserRepository
    {
        User GetById(Guid id);
        List<User> GetAll();
        void Remove();
        bool Update(Guid id, User user);
        bool Save(User user);
    }
}
