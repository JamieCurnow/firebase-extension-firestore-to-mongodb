import { expect } from 'chai'
import * as admin from 'firebase-admin'
import { MongoClient } from 'mongodb'

// Initialize Firebase Admin SDK to connect to the local emulator
admin.initializeApp({
  projectId: 'demo-test'
})
const firestore = admin.firestore()

// MongoDB connection details from the .env file
const uri = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DATABASE_NAME || 'test-db'
const collectionName = process.env.MONGODB_COLLECTION_NAME || 'test-collection'
const firestoreDocIdField = process.env.FIRESTORE_DOC_ID_FIELD || '__firestore_doc_id'
const firestoreCollectionPath = process.env.FIRESTORE_COLLECTION_PATH || 'test-collection'

describe('firestore-to-mongodb', () => {
  let client: MongoClient

  before(async () => {
    client = await MongoClient.connect(uri)
  })

  after(async () => {
    await client.close()
  })

  it('should sync document create, update, and delete to MongoDB', async () => {
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    const docRef = firestore.collection(firestoreCollectionPath).doc('test-doc')

    // 1. Create a document in Firestore
    const createData = { name: 'test', value: 1 }
    await docRef.set(createData)

    // Wait for the function to trigger and write to MongoDB
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // 2. Verify creation in MongoDB
    let mongoDoc = await collection.findOne({ [firestoreDocIdField]: 'test-doc' })
    expect(mongoDoc).to.not.be.null
    expect(mongoDoc?.name).to.equal(createData.name)
    expect(mongoDoc?.value).to.equal(createData.value)

    // 3. Update the document in Firestore
    const updateData = { value: 2 }
    await docRef.update(updateData)

    // Wait for the function to trigger and write to MongoDB
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // 4. Verify update in MongoDB
    mongoDoc = await collection.findOne({ [firestoreDocIdField]: 'test-doc' })
    expect(mongoDoc).to.not.be.null
    expect(mongoDoc?.name).to.equal(createData.name)
    expect(mongoDoc?.value).to.equal(updateData.value)

    // 5. Delete the document from Firestore
    await docRef.delete()

    // Wait for the function to trigger and write to MongoDB
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // 6. Verify deletion from MongoDB
    mongoDoc = await collection.findOne({ [firestoreDocIdField]: 'test-doc' })
    expect(mongoDoc).to.be.null
  }).timeout(20000)
})
