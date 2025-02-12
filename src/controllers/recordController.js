// src/controllers/recordController.js
const Record = require('../models/record');
const { cacheRecord } = require('../services/cacheService');

const BATCH_SIZE = 1000; // Customize this as per your needs (1000 records per batch)

const insertRecords = async (req, res) => {
  let { data, noOfRecords } = req.body;

  if (!data || !noOfRecords || noOfRecords <= 0) {
    return res.status(400).json({ message: "Invalid input. Please provide 'data' and 'noOfRecords'." });
  }

  // Generate the array of records based on the data and noOfRecords
  const records = Array(noOfRecords).fill({ data });

  console.log(`Total records to insert: ${records.length}`);

  try {
    // Insert records in batches
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);
      console.log(`Inserting batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(records.length / BATCH_SIZE)}`);
      
      const insertedRecords = await Record.insertMany(batch, { ordered: false });

      // Optionally, cache the first inserted record from each batch
      if (insertedRecords.length > 0) {
        await cacheRecord('lastInsertedRecord', insertedRecords[0].data);
      }
    }

    res.status(200).json({
      message: `${records.length} records inserted successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to insert records' });
  }
};

module.exports = { insertRecords };
