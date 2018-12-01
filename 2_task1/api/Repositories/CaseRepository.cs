using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using api.Models;
using api.Converters;

namespace api.Repositories
{
    public interface ICaseRepository
    {
        Case GetById(Guid id);
        List<Case> GetAll();
        bool Remove(Guid id);
        bool Update(Guid id, Case c);
        bool Save(Case c);
        bool AddPerson(Guid id, string name);
    }

    public class CaseRepository : ICaseRepository
    {
        private readonly ICaseConverter _caseConverter;

        public CaseRepository(){
          _caseConverter = new CaseConverter();
        }

        public Case GetById(Guid id) {
          XElement xmlFile = XElement.Load("xml/cases.xml");

          return xmlFile.Descendants("case")
                        .Where(n => id.Equals((Guid) n.Element("id")))
                        .Select(n => _caseConverter.transform(n))
                        .SingleOrDefault();
        }

        public List<Case> GetAll() {
          XElement xmlFile = XElement.Load("xml/cases.xml");

          return xmlFile.Descendants("case")
                        .Select(u => _caseConverter.transform(u))
                        .ToList();
        }

        public bool Remove(Guid id) {
          XElement xmlFile = XElement.Load("xml/cases.xml");

          var c = xmlFile.Descendants("case")
                         .Where(n => id.Equals((Guid) n.Element("id")))
                         .SingleOrDefault();

          if (c.IsEmpty) return false;

          c.Remove();
          xmlFile.Save("xml/cases.xml");

          return true;
        }

        public bool Update(Guid id, Case c) {
          XElement xmlFile = XElement.Load("xml/cases.xml");

          var caseToUpdate = xmlFile.Descendants("case")
                                    .Where(n => id.Equals((Guid) n.Element("id")))
                                    .SingleOrDefault();

          if (caseToUpdate == null) return false;

          caseToUpdate.SetElementValue("title", c.title);
          caseToUpdate.SetElementValue("description", c.description);
          caseToUpdate.SetElementValue("isSolved", c.isSolved);

          xmlFile.Save("xml/cases.xml");

          return true;
        }

        public bool Save(Case c) {
          XElement xmlFile = XElement.Load("xml/cases.xml");

          c.id = Guid.NewGuid();

            XElement newCase = _caseConverter.transformXml(c);

          xmlFile.Add(newCase);
          xmlFile.Save("xml/cases.xml");

          return true;
        }

        public bool AddPerson(Guid id, string name) {
          XElement xmlFile = XElement.Load("xml/cases.xml");
          
          XElement persons = xmlFile.Descendants("case")
                                   .Where(n => id.Equals((Guid)n.Element("id")))
                                   .SingleOrDefault()
                                   .Element("persons");

          persons.Add(new XElement("person", name ));

          xmlFile.Save("xml/cases.xml");

          return true;
        }
    }
}
