const md5 = require('md5');
export default {
  hashpw: function (i) {
    const g_passsword_salt="1a2b3c4d"
    let salt = g_passsword_salt;
    let str = ""+salt.charAt(0)+salt.charAt(2) + i +salt.charAt(5) + salt.charAt(4);
    let password = md5(str);
    return password
  }
}