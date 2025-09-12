import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { initializeApp } from 'firebase-admin/app'
import { MongoClient } from 'mongodb'
import * as logger from 'firebase-functions/logger'

initializeApp()

const uri = process.env.MONGODB_CONNECTION_STRING
const dbName = process.env.MONGODB_DATABASE_NAME
const collectionName = process.env.MONGODB_COLLECTION_NAME
const firestoreDocIdField = process.env.FIRESTORE_DOC_ID_FIELD || '__firestore_doc_id'

let client: MongoClient

async function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('MongoDB connection string is not set.')
  }
  if (!client) {
    client = await MongoClient.connect(uri)
  }
  return client
}

export const syncToMongo = onDocumentWritten(
  (process.env.FIRESTORE_COLLECTION_PATH || '') + '/{docId}',
  async (event) => {
    const docId = event.params.docId

    const mongoClient = await getMongoClient()
    if (!dbName || !collectionName) {
      throw new Error('Database or collection name not set')
    }
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)

    // Document was deleted
    if (!event.data?.after.exists) {
      await collection.deleteOne({ [firestoreDocIdField]: docId })
      logger.log(`Deleted document with Firestore ID: ${docId}`)
      return
    }

    const data = event.data.after.data()
    const doc = {
      ...data,
      [firestoreDocIdField]: docId
    }

    // Document was created or updated
    await collection.updateOne({ [firestoreDocIdField]: docId }, { $set: doc }, { upsert: true })
    logger.log(`Upserted document with Firestore ID: ${docId}`)
  }
)
