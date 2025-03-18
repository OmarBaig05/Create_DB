const { Client, Databases, ID } = require('node-appwrite');
const fs = require('fs'); // For writing to a file (optional)

// Initialize the Appwrite client
// Load environment variables from .env file
require('dotenv').config();

const client = new Client()
  .setEndpoint(process.env.ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.PROJECT_API);

const databases = new Databases(client);
const DATABASE_ID = process.env.DATABASE_ID;

// Helper function to create a collection and its attributes
async function createCollectionWithAttributes(collectionName, attributes) {
  try {
    // Step 1: Create the collection
    const collection = await databases.createCollection(
      DATABASE_ID,
      ID.unique(),
      collectionName
    );
    console.log(`Collection "${collectionName}" created:`, collection.$id);

    // Step 2: Add attributes to the collection
    for (const attr of attributes) {
      if (attr.type === 'string') {
        await databases.createStringAttribute(
          DATABASE_ID,
          collection.$id,
          attr.key,
          attr.size || 255, // Default size 255 unless specified
          attr.required || false,
          attr.default || null
        );
      } else if (attr.type === 'integer') {
        await databases.createIntegerAttribute(
          DATABASE_ID,
          collection.$id,
          attr.key,
          attr.required || false,
          attr.min || null,
          attr.max || null,
          attr.default || null
        );
      } else if (attr.type === 'float') {
        await databases.createFloatAttribute(
          DATABASE_ID,
          collection.$id,
          attr.key,
          attr.required || false,
          attr.min || null,
          attr.max || null,
          attr.default || null
        );
      } else if (attr.type === 'array') {
        await databases.createStringAttribute(
          DATABASE_ID,
          collection.$id,
          attr.key,
          10000, // Large size for JSON.stringify array
          attr.required || false,
          attr.default || '[]' // Default to empty array
        );
      }
      console.log(`Attribute "${attr.key}" added to "${collectionName}"`);
    }
  } catch (error) {
    console.error(`Error creating "${collectionName}":`, error);
  }
}

// Define collections and their attributes based on the schema
const collections = [
  {
    name: 'LawyerProfile',
    attributes: [
      { key: 'email', type: 'string', required: true },
      { key: 'name', type: 'string', required: true },
      { key: 'phone', type: 'string', required: true },
      { key: 'address', type: 'string', required: true },
      { key: 'city', type: 'string', required: true },
      { key: 'state', type: 'string', required: true },
      { key: 'zip', type: 'string', required: true },
      { key: 'country', type: 'string', required: true },
      { key: 'practiceAreas', type: 'array', required: true },
      { key: 'experience', type: 'string', required: false },
      { key: 'education', type: 'string', required: false },
      { key: 'languages', type: 'array', required: false },
      { key: 'consultationFees', type: 'float', required: true },
      { key: 'rating', type: 'float', required: true },
      { key: 'reviews', type: 'array', required: true },
      { key: 'casesHandled', type: 'integer', required: false },
      { key: 'casesWon', type: 'integer', required: false },
      { key: 'casesLost', type: 'integer', required: false },
      { key: 'profilePic', type: 'string', required: true },
    ],
  },
  // {
  //   name: 'ClientProfile',
  //   attributes: [
  //     { key: 'email', type: 'string', required: true },
  //     { key: 'name', type: 'string', required: true },
  //     { key: 'phone', type: 'string', required: true },
  //     { key: 'address', type: 'string', required: true },
  //     { key: 'city', type: 'string', required: true },
  //     { key: 'state', type: 'string', required: true },
  //     { key: 'zip', type: 'string', required: true },
  //     { key: 'country', type: 'string', required: true },
  //     { key: 'casesInvolved', type: 'array', required: true },
  //     { key: 'profilePic', type: 'string', required: true },
  //   ],
  // },
  // {
  //   name: 'ChamberProfile',
  //   attributes: [
  //     { key: 'email', type: 'string', required: true },
  //     { key: 'name', type: 'string',required  : true },
  //     { key: 'phone', type: 'string', required: true },
  //     { key: 'address', type: 'string', required: true },
  //     { key: 'city', type: 'string', required: true },
  //     { key: 'state', type: 'string', required: true },
  //     { key: 'zip', type: 'string', required: true },
  //     { key: 'country', type: 'string', required: true },
  //     { key: 'casesHandled', type: 'array', required: true },
  //     { key: 'chamberLogo', type: 'string', required: true },
  //   ],
  // },
  {
    name: 'AssistantProfile',
    attributes: [
      { key: 'userId', type: 'string', required: true },
      { key: 'email', type: 'string', required: true },
      { key: 'name', type: 'string', required: true },
      { key: 'phone', type: 'string', required: true },
      { key: 'address', type: 'string', required: true },
      { key: 'city', type: 'string', required: true },
      { key: 'state', type: 'string', required: true },
      { key: 'zip', type: 'string', required: true },
      { key: 'country', type: 'string', required: true },
      { key: 'casesAssisted', type: 'array', required: true },
      { key: 'profilePic', type: 'string', required: true },
      { key: 'pern', type: 'array', required: true }, // Assuming "pern" is roles
    ],
  },
  {
    name: 'Subscription',
    attributes: [
      { key: 'userId', type: 'string', required: true },
      { key: 'subscriptionId', type: 'string', required: true },
      { key: 'subscriptionType', type: 'string', required: true },
      { key: 'subscriptionAmount', type: 'float', required: true },
      { key: 'subscriptionDate', type: 'string', required: true },
      { key: 'subscriptionExpiry', type: 'string', required: true },
      { key: 'subscriptionStatus', type: 'string', required: true },
    ],
  },
  {
    name: 'Case',
    attributes: [
      { key: 'userId', type: 'string', required: true },
      { key: 'caseId', type: 'string', required: true },
      { key: 'caseType', type: 'string', required: true },
      { key: 'caseTitle', type: 'string', required: true },
      { key: 'caseDescription', type: 'string', required: true },
      { key: 'caseStatus', type: 'string', required: true },
      { key: 'caseDate', type: 'string', required: true },
      { key: 'clientId', type: 'string', required: true },
      { key: 'lawyerId', type: 'string', required: true },
      { key: 'chamberId', type: 'string', required: true },
      { key: 'assistantId', type: 'string', required: true },
      { key: 'hearingDate', type: 'string', required: true },
      { key: 'hearingTime', type: 'string', required: true },
      { key: 'hearingVenue', type: 'string', required: true },
      { key: 'documents', type: 'array', required: true },
      { key: 'notes', type: 'string', required: true },
      { key: 'rating', type: 'float', required: true },
      { key: 'review', type: 'string', required: true },
    ],
  },
  {
    name: 'Document',
    attributes: [
      { key: 'userId', type: 'string', required: true },
      { key: 'documentId', type: 'string', required: true },
      { key: 'documentName', type: 'string', required: true },
      { key: 'documentType', type: 'string', required: true },
      { key: 'documentUrl', type: 'string', required: true },
      { key: 'documentDate', type: 'string', required: true },
      { key: 'caseId', type: 'string', required: true },
    ],
  },
  {
    name: 'Reminder',
    attributes: [
      { key: 'userId', type: 'string', required: true },
      { key: 'reminderId', type: 'string', required: true },
      { key: 'reminderTitle', type: 'string', required: true },
      { key: 'reminderDescription', type: 'string', required: true },
      { key: 'reminderDate', type: 'string', required: true },
      { key: 'reminderTime', type: 'string', required: true },
      { key: 'reminderStatus', type: 'string', required: true },
    ],
  },
  {
    name: 'Feedback',
    attributes: [
      { key: 'feedbackId', type: 'string', required: true },
      { key: 'userId', type: 'string', required: true },
      { key: 'caseId', type: 'string', required: true },
      { key: 'rating', type: 'float', required: true },
      { key: 'comment', type: 'string', required: true },
      { key: 'feedbackDate', type: 'string', required: true },
    ],
  },
  {
    name: 'Appointment',
    attributes: [
      { key: 'appointmentId', type: 'string', required: true },
      { key: 'userId', type: 'string', required: true },
      { key: 'lawyerId', type: 'string', required: true },
      { key: 'clientId', type: 'string', required: true },
      { key: 'appointmentDate', type: 'string', required: true },
      { key: 'appointmentTime', type: 'string', required: true },
      { key: 'appointmentType', type: 'string', required: true },
      { key: 'appointmentStatus', type: 'string', required: true },
      { key: 'notes', type: 'string', required: true },
    ],
  },
  {
    name: 'Announcements',
    attributes: [
      { key: 'announcementId', type: 'string', required: true },
      { key: 'announcementTitle', type: 'string', required: true },
      { key: 'announcementDescription', type: 'string', required: true },
      { key: 'announcementDate', type: 'string', required: true },
      { key: 'announcementTime', type: 'string', required: true },
      { key: 'announcementStatus', type: 'string', required: true },
      { key: 'announcementMedia', type: 'string', required: true },
    ],
  },
  {
    name: 'DraftedDocuments',
    attributes: [
      { key: 'userId', type: 'string', required: true },
      { key: 'clientId', type: 'string', required: true },
      { key: 'caseId', type: 'string', required: true },
      { key: 'documentId', type: 'string', required: true },
      { key: 'documentName', type: 'string', required: true },
      { key: 'documentType', type: 'string', required: true },
      { key: 'documentUrl', type: 'string', required: true },
      { key: 'documentDate', type: 'string', required: true },
    ],
  },
];

// Execute the creation of all collections
async function setupCollections() {
  for (const collection of collections) {
    await createCollectionWithAttributes(collection.name, collection.attributes);
  }
  console.log('All collections and attributes created successfully!');
}

setupCollections();