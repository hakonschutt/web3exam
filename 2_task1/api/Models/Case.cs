using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    /*
     * Case modal for variable locking
     */
	public class Case
	{
		public Guid id { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public List<string> persons { get; set; }
		public bool isSolved { get; set; }
	}
}
