/* START: workIdLinkJs v0.0.1 */

/* browser and NodeJs compatible */
(function(exports){

   // add new method to string
   if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function (str){
         return this.slice(0, str.length) == str;
      };
   }

   //add new method to string
   if (typeof String.prototype.endsWith != 'function') {
      String.prototype.endsWith = function (str){
         return this.slice(-str.length) == str;
      };
   }

   if (typeof String.prototype.trim != 'function') {  
      String.prototype.trim = function () {  
         return this.replace(/^\s+|\s+$/g,'');  
      };  
   }

   var typeMap = {};
   
   typeMap.hasOwnProperty = function(property) {
      return typeMap[property] !== undefined;
   };
   
   typeMap['arxiv'] = function (id) {
      if (id.startsWith('arxiv.org')) return 'http://' + id;
      if (id.startsWith('arXiv:')) return 'http://arxiv.org/abs/' + id.substring(6);
      return 'http://arxiv.org/abs/' + id;
   };
   
   typeMap['asin'] = function (id) {
      if (id.startsWith('amazon.') || id.startsWith('www.amazon.')) return 'http://' + id;
      return 'http://www.amazon.com/dp/' + id;
   };

   typeMap['bibcode'] = function (id) {
      if (id.startsWith('adsabs.harvard.edu')) return 'http://' + id;
      return 'http://adsabs.harvard.edu/abs/' + id;
   };
   
   typeMap['doi'] = function (id) {
      if (id.startsWith('dx.doi.org') || id.startsWith('dx.doi.org')) return 'http://' + id;
      return 'http://dx.doi.org/' + id;
   };

   /* we should find a better source */
   typeMap['isbn'] = function (id) {
      if (id.startsWith('amazon.com/dp/')) return 'http://' + id;
      return 'http://www.amazon.com/dp/' + id.replace(/\-/g, '');
   };

   typeMap['jfm'] = function (id) {
      if (id.startsWith('www.zentralblatt-math.org')) return 'http://' + id;
      return 'http://www.zentralblatt-math.org/zmath/en/search/?q=an:' + id + '&format=complete';
   };

   typeMap['jstor'] = function (id) {
      if (id.startsWith('dx.doi.org') || id.startsWith('www.jstor.org')) return 'http://' + id;
      return 'http://www.jstor.org/stable/' + id;
   };
 
   exports.getLink = function(id, type) {
      if (id == null) return null;
      id = id.trim();
      if (id.startsWith('http:') || id.startsWith('https:')) return id;
      if (type == null) return null;
      if (!typeMap.hasOwnProperty(type)) return null;
      return typeMap[type](id);
    };

})(typeof exports === 'undefined'? this['workIdLinkJs']={}: exports);

/* END: workIdLinkJs */

