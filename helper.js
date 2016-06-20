/*jshint esversion: 6 */

module.exports = {

findIdByName: function(list, name) {
      for (var i = 0; i < list.length; i++) {
        var thelist = list[i];
        if (name === thelist.username)
          return thelist.id;
     }
   },
findIdByTitle: function(list, name) {
  for (var i = 0; i < list.length; i++) {
    var thelist = list[i];
    if (name === thelist.title) {
       return thelist.id;
    }
   }
 }
};
