'use strict';


var Utilities =  {
  generateUniqueId: function () {
    var id = new Date().getTime().toString();
    var random = Math.floor((Math.random()*100)+1).toString();
    return id + random;
  }
};

