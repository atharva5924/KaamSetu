import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour cache

export const cacheMiddleware = (duration = 3600) => {
  return (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cachedData = cache.get(key);

    if (cachedData) {
      res.json(cachedData);
      return;
    }

    const originalJson = res.json.bind(res);
    res.json = function (data) {
      cache.set(key, data, duration);
      return originalJson(data);
    };

    next();
  };
};

export default cache;
    