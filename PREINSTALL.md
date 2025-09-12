<!--
This file provides your users an overview of your extension. All content is optional, but this is the recommended format. Your users will see the contents of this file when they run the `firebase ext:info` command.

Include any important functional details as well as a brief description for any additional setup required by the user (both pre- and post-installation).

Learn more about writing a PREINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/publishers/user-documentation#writing-preinstall
-->

Use this extension to sync a Firestore collection to a MongoDB database.

This extension listens for changes in a specified Firestore collection and syncs them to a MongoDB collection. It handles document creations, updates, and deletions in Firestore and reflects those changes in your MongoDB database.

# Before you install

Before installing this extension, you'll need to:

- Set up a [Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project.
- Have a MongoDB database available and its connection string. Why not use [Firestore Enterprise](https://firebase.google.com/docs/firestore/enterprise/mongodb-compatibility-overview)?

# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Functions (Node.js 22+ runtime)
- Firestore
- Secret Manager
- Outbound networking

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is required for this extension because it uses Firebase Functions. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)
