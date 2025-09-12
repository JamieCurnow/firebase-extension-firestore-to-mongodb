# Firestore to MongoDB Sync Firebase Extension

This Firebase Extension syncs a specified Firestore collection to a MongoDB collection. It listens for document creations, updates, and deletions in Firestore and mirrors those changes in your MongoDB database.

## How it Works

When you write to a document in the configured Firestore collection, a Cloud Function is triggered. This function then connects to your MongoDB database and performs the corresponding write operation:

- **On Create**: A new document is inserted into your MongoDB collection. The Firestore document ID is stored in a field you can specify (defaults to `__firestore_doc_id`).
- **On Update**: The corresponding document in MongoDB is updated with the new data from Firestore.
- **On Delete**: The corresponding document is deleted from your MongoDB collection.

## Prerequisites

- A Firebase project with the Blaze (pay-as-you-go) plan.
- A Firestore database set up in your Firebase project.
- A MongoDB database and its connection string.

## Installation

To install this extension, you can either install it from the Firebase Extensions Hub (once published) or install it from a local source.

### Install from Local Source

1. Clone this repository:

   ```bash
   git clone https://github.com/JamieCurnow/firebase-extension-firestore-to-mongodb.git
   ```

2. Navigate to a directory where you have a Firebase project initialized.
3. Run the following command, replacing `/path/to/repo` with the path to the cloned repository:

   ```bash
   firebase ext:install /path/to/repo/firebase-extension-firestore-to-mongodb
   ```

4. Follow the on-screen prompts to configure the extension.

## Configuration Parameters

| Parameter                       | Description                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Location**                    | The Cloud Functions location where you want to deploy the extension.                                   |
| **MongoDB Connection String**   | Your MongoDB database connection string.                                                               |
| **MongoDB Database Name**       | The name of the database to sync to.                                                                   |
| **MongoDB Collection Name**     | The name of the collection to sync to.                                                                 |
| **Firestore Collection Path**   | The path to the Firestore collection to sync from.                                                     |
| **Firestore Document ID Field** | The name of the field in MongoDB to store the Firestore document ID. Defaults to `__firestore_doc_id`. |

## Troubleshooting

permissions_error on Eventarc trigger for cloud function:
If you encounter an issue where the function is never triggered, it's probably an IAM permissions issue.
An easy way to check this is to go to Pub/Sub in the Google Cloud Console, click into any topic, and then
click the button that says "Trigger Cloud Function". That will open a side panel and you may see an error message indicating a permissions issue.

## Development

If you want to contribute to this extension or deploy your own version, you can use the following command to upload it to the Firebase Extensions Hub:

```bash
firebase ext:dev:upload jamiecurnow/firestore-to-mongodb
```
