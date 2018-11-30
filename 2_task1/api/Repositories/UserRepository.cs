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
        private readonly UserConverter _userConverter;

        public UserRepository()
        {
            _userConverter = new UserConverter();
        }

        public User GetById(Guid id) {
          XElement xmlFile = XElement.Load("xml/users.xml");

          return xmlFile.Descendants("user")
                        .Where(n => id.Equals((Guid) n.Element("id")))
                        .Select(n => _userConverter.transform(n))
                        .SingleOrDefault();
        }

        public List<User> GetAll() {
          XElement xmlFile = XElement.Load("xml/users.xml");

          return xmlFile.Descendants("user")
                        .Select(u => _userConverter.transform(u))
                        .ToList();
        }

        public bool Remove(Guid id) {
          XElement xmlFile = XElement.Load("xml/users.xml");

          var user = xmlFile.Descendants("user")
                            .Where(n => id.Equals((Guid) n.Element("id")))
                            .SingleOrDefault();

          if (user.IsEmpty) return false;

          user.Remove();
          xmlFile.Save("xml/users.xml");

          return true;
        }

        public bool Save(User user) {
          XElement xmlFile = XElement.Load("xml/users.xml");
          XElement newUser = _userConverter.transformXml(user);

          xmlFile.Add(newUser);
          xmlFile.Save("xml/users.xml");

          return true;
        }
    }
}
