const Redis = require('ioredis');
require('dotenv').config(); // Load environment variables

const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// Example of setting and getting a value
redis.set('key', 'value', (err, result) => {
    if (err) throw err;
    console.log(result); // Should log 'OK'

    redis.get('key', (err, result) => {
        if (err) throw err;
        console.log(result); // Should log 'value'
    });
});