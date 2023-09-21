const password_rejected = {
  too_short: '最短长度为{{min}}。',
  too_long: '最长长度为{{max}}。',
  character_types: '需要至少{{min}}种字符类型。',
  unsupported_characters: '发现不支持的字符。',
  pwned: '避免使用容易被猜到的简单密码。',
  restricted_found: '避免过度使用{{list, list}}。',
  restricted_repetition: '重复字符',
  restricted_sequence: '连续字符',
  restricted_userinfo: '您的个人信息',
  restricted_words: '产品上下文',
};

export default Object.freeze(password_rejected);
