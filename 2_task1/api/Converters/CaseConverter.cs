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
	public class CaseConverter
	{
    public Case transform(XElement case)
    {
			if (case.IsEmpty) return null;

      return new Case() {
        id = (Guid) case.Element("id"),
        title = (string) case.Element("name"),
        description = (string) case.Element("description"),
        persons = (List<string>) case.Descendants("person")
                                     .Select(u => u.ToString())
                                     .ToList(),
    		isSolved = (string) case.Element("isSolved"),
			};
    }

    public XElement transformXml(Case case)
    {
      return new XElement("case",
        new XElement("id", case.id),
        new XElement("title", case.title),
        new XElement("description", case.description),
        new XElement("persons", case.persons.ConvertAll<string>( a => new XElement("person", a ))),
        new XElement("isSolved", case.isSolved)
      );
    }
	}
}
