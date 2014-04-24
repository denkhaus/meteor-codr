stringToBase64 = function (str) {
    var dat = CryptoJS.enc.Utf8.parse(str);
    return CryptoJS.enc.Base64.stringify(dat);
};

base64ToString = function (base64) {
    var data = CryptoJS.enc.Base64.parse(base64);
    return CryptoJS.enc.Utf8.stringify(data);
};