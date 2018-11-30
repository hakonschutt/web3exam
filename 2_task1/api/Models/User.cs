using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class User
	{
		public Guid id { get; set; }
    public string name { get; set; }
    public string email { get; set; }
    public string password { get; set; }
		public bool disabled { get; set; }
	}
}
