export const ezEncode = (str) => {
    const len = str.length;
    const ezEncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let out;
    let i;
    let c1;
    let c2;
    let c3;

    i = 0;
    out = '';
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i === len) {
            out += ezEncodeChars.charAt(c1 >> 2);
            out += ezEncodeChars.charAt((c1 & 0x3) << 4);
            out += '==';
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i === len) {
            out += ezEncodeChars.charAt(c1 >> 2);
            out += ezEncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += ezEncodeChars.charAt((c2 & 0xF) << 2);
            out += '=';
            break;
        }
        c3 = str.charCodeAt(i++);
        out += ezEncodeChars.charAt(c1 >> 2);
        out += ezEncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += ezEncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += ezEncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}