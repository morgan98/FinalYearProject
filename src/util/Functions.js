// Used for storing the Authentication state
export function randomStringGen(length) {
    let text = '';
    const stringChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += stringChars.charAt(Math.floor(Math.random() * stringChars.length));
    }
  }
  
  // USed for handling parameters when logging in 
  export function hashParams() {
    var hp = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hp[e[1]] = decodeURIComponent(e[2]);
    }
    return hp;
  }