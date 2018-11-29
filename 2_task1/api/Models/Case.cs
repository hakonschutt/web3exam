using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class Case
	{
		public Case()
		{
			CreationTime = DateTime.Now.ToString(new CultureInfo("no-NO"));
		}

		public Guid Id { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public List<User> persons { get; set; }
		public string CreationTime { get; set; }
		public bool isSolved { get; set; }
	}
}
