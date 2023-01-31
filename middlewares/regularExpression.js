const validUrlLink = /^(https?:\/\/)?([\w-]+\.[\w-]+)\S*$/;
const validRuName = /[а-яёА-ЯЁa-zA-Z\0-9\-._~:?#[\]@!$&'()*+,;=]$/;
const validEnName = /[а-яёА-ЯЁa-zA-Z\0-9\-._~:?#[\]@!$&'()*+,;=]$/;

module.exports = { validUrlLink, validRuName, validEnName };
