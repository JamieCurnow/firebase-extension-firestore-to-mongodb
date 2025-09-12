<!--
This file provides your users an overview of how to use your extension after they've installed it. All content is optional, but this is the recommended format. Your users will see the contents of this file in the Firebase console after they install the extension.

Include instructions for using the extension and any important functional details. Also include **detailed descriptions** for any additional post-installation setup required by the user.

Reference values for the extension instance using the ${param:PARAMETER_NAME} or ${function:VARIABLE_NAME} syntax.
Learn more in the docs: https://firebase.google.com/docs/extensions/publishers/user-documentation#reference-in-postinstall

Learn more about writing a POSTINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/publishers/user-documentation#writing-postinstall
-->

# See it in action

You can test out this extension right away!

1. Go to your [Firestore dashboard](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore) in the Firebase console.
2. Create a new document in the `${param:FIRESTORE_COLLECTION_PATH}` collection.
3. In a few seconds, you should see the new document appear in your MongoDB database, in the `${param:MONGODB_COLLECTION_NAME}` collection of the `${param:MONGODB_DATABASE_NAME}` database.

# Using the extension

This extension will automatically sync any document creations, updates, or deletions from your `${param:FIRESTORE_COLLECTION_PATH}` collection in Firestore to your `${param:MONGODB_COLLECTION_NAME}` collection in MongoDB.

The Firestore document ID will be stored in the `${param:FIRESTORE_DOC_ID_FIELD}` field in your MongoDB documents.

# Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
