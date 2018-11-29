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
	public class UserConverter
	{
    public User transform(XElement user)
    {
      if (user == null) return null;

      return new User(
        (Guid) user.Element("id"),
        (string) user.Element("name"),
        (string) user.Element("email"),
        (string) user.Element("password"),
        (bool) user.Element("disabled")
      );
    }

    public XElement transformXml(User user)
    {
      return new XElement("user",
        new XElement("id", user.id),
        new XElement("name", user.name),
        new XElement("email", user.email),
        new XElement("password", user.password),
        new XElement("disabled", user.disabled)
      );
    }
	}
}
