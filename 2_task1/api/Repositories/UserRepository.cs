using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using api.Models;
using api.Converters;

namespace api.Repositories
{
    /*
     * Interface for user repository
     */
    public interface IUserRepository
    {
        User Authenticate(string username, string password);
        User GetById(Guid id);
        List<User> GetAll();
        bool Remove(Guid id);
        bool Save(User user);
    }

    /*
     * User repository for posting and retriving data from database (xml file)
     * 
     * This is intendend as a under deveelopment section. Was intenting 
     * to try creating user authentication but didnt manage to finish
     */
    public class UserRepository : IUserRepository
    {
        private readonly IUserConverter _userConverter;

        public UserRepository()
        {
            _userConverter = new UserConverter();
        }

        /*
         * Authentication section for verifying user information
         */
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

        /*
         * Retrives user by id
         */
        public User GetById(Guid id) {
          XElement xmlFile = XElement.Load("xml/users.xml");

          return xmlFile.Descendants("user")
                        .Where(n => id.Equals((Guid) n.Element("id")))
                        .Select(n => _userConverter.transform(n))
                        .SingleOrDefault();
        }

        /*
         * List all users in database (xml file)
         */
        public List<User> GetAll() {
          XElement xmlFile = XElement.Load("xml/users.xml");

          return xmlFile.Descendants("user")
                        .Select(u => _userConverter.transform(u))
                        .ToList();
        }

        /*
         * Removes user from database with the given id
         */
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

        /*
         * Saves new user to database
         */
        public bool Save(User user) {
          XElement xmlFile = XElement.Load("xml/users.xml");

          user.id = Guid.NewGuid();
            user.password = CreatePasswordHash(user.password);

          XElement newUser = _userConverter.transformXml(user);

          xmlFile.Add(newUser);
          xmlFile.Save("xml/users.xml");

          return true;
        }

        /*
         * Create password hash should implement hashing of password before saving
         */
        private static string CreatePasswordHash(string password)
        {
          return password;
        }

        /*
         * Verify user password by compaing to user hash
         */
        private static bool VerifyPasswordHash(string password, User user)
        {
          return password == user.password;
        }
    }
}
