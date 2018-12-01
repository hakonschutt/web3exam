using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using api.Models;
using api.Converters;

namespace api.Repositories
{
    public interface IUserRepository
    {
        User Authenticate(string username, string password);
        User GetById(Guid id);
        List<User> GetAll();
        bool Remove(Guid id);
        bool Save(User user);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IUserConverter _userConverter;

        public UserRepository()
        {
            _userConverter = new UserConverter();
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
              return null;
            }

            XElement xmlFile = XElement.Load("xml/users.xml");

            var user =  xmlFile.Descendants("user")
                               .Where(n => username == (string) n.Element("username"))
                               .Select(n => _userConverter.transform(n))
                               .SingleOrDefault();

            if (user == null)
            {
              return null;
            }

            if (!VerifyPasswordHash(password, user))
            {
              return null;
            }

            return user;
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

          user.id = Guid.NewGuid();
            user.password = CreatePasswordHash(user.password);

          XElement newUser = _userConverter.transformXml(user);

          xmlFile.Add(newUser);
          xmlFile.Save("xml/users.xml");

          return true;
        }

        private static string CreatePasswordHash(string password)
        {
          return password;
        }

        private static bool VerifyPasswordHash(string password, User user)
        {
          return password == user.password;
        }
    }
}
