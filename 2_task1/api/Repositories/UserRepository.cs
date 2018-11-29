using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using api.Models;
using api.Converters;

namespace api.Repositories
{
    public class UserRepository : IUserRepository
    {
        public User GetById(Guid id) {
          XElement usersXMLFile = XElement.Load("xml/users.xml");

          var selectedUser = (from user in usersXMLFile.Descendants("user")
                          where user.Element("id").Equals(id)
                          select user).SingleOrDefault();

          return new UserConverter().transform(selectedUser);
        }

        public List<User> GetAll() {
          return new List<User>();
        }

        public void Remove() {
          return;
        }

        public bool Update(Guid id, User user) {
          return true;
        }

        public bool Save(User user) {
          return true;
        }
    }
}
