using System.Collections.Generic;
using System.Linq;
using api.Models;
using api.Converters;

namespace api.Repositories
{
    public class CaseRepository : ICaseRepository
    {
        public CaseRepository(){}

        public Case GetById(int id) {
          return null;
        }

        public List<Case> GetAll() {
          return new List<Case>();
        }

        public void Remove() {
          return;
        }

        public bool Update(int id, Case user) {
          return true;
        }

        public bool Save(Case user) {
          return true;
        }
    }
}
