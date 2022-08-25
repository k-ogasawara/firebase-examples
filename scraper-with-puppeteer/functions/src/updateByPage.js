const admin = require('firebase-admin');
const { getContents } = require('./getContents');

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const firestore = admin.firestore();

const updateByPage = async (url) => {
  const contents = await getContents(url);
  // Use contents as you like.
  // ex. save contents to firestore
  const contentsRef = firestore.doc('contents/1');
  try {
    await contentsRef.set(contents, { merge: true });
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

exports.updateByPage = updateByPage;
