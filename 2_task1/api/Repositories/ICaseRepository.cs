using System.Collections.Generic;
using api.Models;

namespace api.Repositories
{
    public interface ICaseRepository
    {
        Case GetById(int id);
        List<Case> GetAll();
        void Remove();
        bool Update(int id, Case user);
        bool Save(Case user);
    }
}
