/*
  Example CRUD operations for all collections defined in dataBase.js.
  This uses node-appwrite to create, read, update, and delete documents.
  Arrays are stored as JSON strings, and "images" (e.g. profilePic) are handled as string URLs/base64.
*/

const { Client, Databases, ID } = require('node-appwrite');

// Initialize your Appwrite client
const client = new Client()
  .setEndpoint(process.env.ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.PROJECT_API);

const databases = new Databases(client);
const DATABASE_ID = process.env.DATABASE_ID;

/**
 * Create a new document in a specified collection.
 * For array fields, pass the array as JSON.stringify(arr).
 * For image fields, pass the string URL/base64.
 */
async function createData(collectionId, data) {
  try {
    // Use a unique ID or supply your own
    const response = await databases.createDocument(
      DATABASE_ID,
      collectionId,
      ID.unique(),
      { ...data }
    );
    console.log('Document created:', response);
    return response;
  } catch (error) {
    console.error('Create error:', error);
    throw error;
  }
}

/**
 * Read a document by its ID from a specific collection.
 */
async function readData(collectionId, documentId) {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      collectionId,
      documentId
    );
    console.log('Document read:', response);
    return response;
  } catch (error) {
    console.error('Read error:', error);
    throw error;
  }
}

/**
 * Update a document by its ID in a specific collection.
 * For arrays, again serialize/deserialize as needed.
 */
async function updateData(collectionId, documentId, newData) {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      collectionId,
      documentId,
      { ...newData }
    );
    console.log('Document updated:', response);
    return response;
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
}

/**
 * Delete a document by its ID from a specific collection.
 */
async function deleteData(collectionId, documentId) {
  try {
    const response = await databases.deleteDocument(
      DATABASE_ID,
      collectionId,
      documentId
    );
    console.log('Document deleted:', response);
    return response;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}

// Exporting the functions so you can use them in your application
export {
  createData,
  readData,
  updateData,
  deleteData
};