const { createClient } = require('redis');

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.error('Redis client error:', err);
});

const connectClient = async () => {
  try {
    if (!client.isOpen) {
      await client.connect(); 
    }
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error; 
  }
};


const cacheRecord = async (key, value) => {
  try {
    await connectClient();
    await client.set(key, value, { EX: 3600 }); 
    console.log(`Record cached: ${key}`);
  } catch (error) {
    console.error('Error caching record:', error);
  }
};

const getCachedRecord = async (key) => {
  try {
    await connectClient(); 
    const reply = await client.get(key); 
    return reply; 
  } catch (error) {
    console.error('Error getting cached record:', error);
    throw error; 
  }
};

module.exports = { cacheRecord, getCachedRecord };
