require('dotenv').config();
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const { main } = require('./LLM');
const { examplesarray } = require('./trainingarray');
const { formatstring } = require('./prompt')
// const { fetchAllDataAndWriteToFile } = require('./emailfetch');
const { firebaseConfig } = require('./firebase')
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = process.env.COLLECTIONNAME;

async function fetchAllDataAndWriteToFile() {
    try {
        const subscribersCollection = collection(db, collectionName);
        const querySnapshot = await getDocs(subscribersCollection);
        const allDocuments = [];
        querySnapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.exists()) {
                const data = documentSnapshot.data();
                allDocuments.push(data);
            }
        });
        const jsonData = JSON.stringify(allDocuments, null, 2);
        const emails = allDocuments.map(document => document.email);
        return emails;

    } catch (error) {
        console.error('Error in fetchAllDataAndWriteToFile:', error);
    }
}

module.exports = { fetchAllDataAndWriteToFile };
