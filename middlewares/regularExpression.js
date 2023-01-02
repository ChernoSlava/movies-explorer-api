const validUrlLink = /^(https?:\/\/)?([\w-]+\.[\w-]+)\S*$/;
const validRuName = /[а-яёА-ЯЁ\0-9\-._~:/?#[\]@!$&'()*+,;=]$/;
const validEnName = /[a-zA-Z\0-9\w\-._~:/?#[\]@!$&'()*+,;=]$/;

module.exports = { validUrlLink, validRuName, validEnName };
