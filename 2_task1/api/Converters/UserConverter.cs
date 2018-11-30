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
			if (user.IsEmpty) return null;

      return new User() {
				id = (Guid) user.Element("id"),
        name = (string) user.Element("name"),
        email = (string) user.Element("email"),
        password = (string) user.Element("password"),
        disabled = (bool) user.Element("disabled")
			};
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
