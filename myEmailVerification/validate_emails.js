var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'validate.js';
document.head.appendChild(script);

var constraints = {	  
        email: {          
          presence: true,          
          email: true
        }          
        };
var errors = validate({email: "bad"}, constraints);