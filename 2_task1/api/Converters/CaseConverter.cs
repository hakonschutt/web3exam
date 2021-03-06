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
     * Case converter interface
     */
	public interface ICaseConverter
	{
		Case transform(XElement c);
		XElement transformXml(Case c);
	}

    /*
     * Case converter used to format from request json (modal) to storage xml
     */
    public class CaseConverter : ICaseConverter
	{
        /*
         * Transform case xml to case json (modal)
         */
        public Case transform(XElement c)
        {
    			if (c.IsEmpty) return null;

          return new Case() {
            id = (Guid) c.Element("id"),
            title = (string) c.Element("title"),
            description = (string) c.Element("description"),
            persons = (List<string>) c.Descendants("person")
                                      .Select(u => u.Value)
                                      .ToList(),
        		isSolved = (bool) c.Element("isSolved")
    			};
        }

        /*
         * Transform xml to json case (modal)
         */
        public XElement transformXml(Case c)
        {
          return new XElement("case",
            new XElement("id", c.id),
            new XElement("title", c.title),
            new XElement("description", c.description),
            new XElement("persons", c.persons.ConvertAll<XElement>( a => new XElement("person", a ))),
            new XElement("isSolved", c.isSolved)
          );
        }
	}
}
