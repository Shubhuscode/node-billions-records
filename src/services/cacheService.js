const { createClient } = require('redis');

// Initialize the Redis client
const client = createClient();

// Log when the client connects successfully
client.on('connect', () => {
  console.log('Redis client connected');
});

// Log when an error occurs
client.on('error', (err) => {
  console.error('Redis client error:', err);
});

// Ensure the client connects before using it
const connectClient = async () => {
  try {
    if (!client.isOpen) {
      await client.connect(); // Ensures the client is connected
    }
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error; // Re-throw the error if the connection fails
  }
};

// Cache a record with a 1-hour expiration time
const cacheRecord = async (key, value) => {
  try {
    await connectClient(); // Ensure the client is connected
    await client.set(key, value, { EX: 3600 }); // Cache record with expiry of 1 hour
    console.log(`Record cached: ${key}`);
  } catch (error) {
    console.error('Error caching record:', error);
  }
};

// Retrieve a cached record
const getCachedRecord = async (key) => {
  try {
    await connectClient(); // Ensure the client is connected
    const reply = await client.get(key); // Get cached record
    return reply; // Return cached data
  } catch (error) {
    console.error('Error getting cached record:', error);
    throw error; // Re-throw the error if getting the record fails
  }
};

module.exports = { cacheRecord, getCachedRecord };
