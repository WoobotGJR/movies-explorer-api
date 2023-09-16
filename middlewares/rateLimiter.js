// eslint-disable-next-line import/no-import-module-exports
const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  limit: 100, // Лимит с каждого IP до 100 запросов за окно (лимит сбрасывается раз в 15 минут)
  message: 'В настоящее время превышено количество запросов на сервер. Повторите попытку позже',
});

module.exports = limiter;
