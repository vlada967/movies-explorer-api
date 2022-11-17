const regexForEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexForUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&=]*)/;

module.exports = { regexForEmail, regexForUrl };
