

( function () {
  var autoLink,
    slice = [].slice;

  autoLink = function () {
    var callback, k, linkAttributes, option, options, pattern, v;
    options = 1 <= arguments.length ? slice.call( arguments, 0 ) : [];
    pattern = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
    if ( !( options.length > 0 ) ) {
      return this.replace( pattern, "$1<a href='$2'>$2</a>" );
    }
    option = options[0];
    callback = option["callback"];
    linkAttributes = ( ( function () {
      var results;
      results = [];
      for ( k in option ) {
        v = option[k];
        if ( k !== 'callback' ) {
          results.push( " " + k + "='" + v + "'" );
        }
      }
      return results;
    } )() ).join( '' );
    return this.replace( pattern, function ( match, space, url ) {
      var link;
      link = ( typeof callback === "function" ? callback( url ) : void 0 ) || ( "<a href='" + url + "'" + linkAttributes + ">" + url + "</a>" );
      return "" + space + link;
    } );
  };

  String.prototype['autoLink'] = autoLink;

} ).call( this );
