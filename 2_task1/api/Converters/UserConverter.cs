using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Converters
{   
    /*
     * User converter interface
     */
	public interface IUserConverter
	{
		User transform(XElement user);
		XElement transformXml(User user);
	}

    /*
     * User converter used to format from request json (modal) to storage xml
     */
	public class UserConverter : IUserConverter
	{
        /*
         * Transforms data from xml to sendable json (modal)
         */
        public User transform(XElement user)
        {
    			if (user.IsEmpty) return null;

          return new User() {
    				id = (Guid) user.Element("id"),
            name = (string) user.Element("name"),
            username = (string) user.Element("username"),
            password = (string) user.Element("password"),
            disabled = (bool) user.Element("disabled")
    			};
        }

        /*
         * transform user json (modal) to xml
         */
        public XElement transformXml(User user)
        {
          return new XElement("user",
            new XElement("id", user.id),
            new XElement("name", user.name),
            new XElement("username", user.username),
            new XElement("password", user.password),
            new XElement("disabled", user.disabled)
          );
        }
	}
}
