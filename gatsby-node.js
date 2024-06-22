/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const _ = require("lodash");
const path = require("path");
const { DatabaseRef } = require("./firebase-config"); // Adjust the path as per your Firebase configuration


exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  // Fetch color palettes data from Firebase
  const snapshot = await DatabaseRef.child("QA").once("value");
  const data = snapshot.val();
  // Generate pages based on fetched db data
  Object.entries(data).forEach(([key, pageData]) => {
    //console.log('key');
    createPage({
      path: `/questions/${_.kebabCase(key.slice(0,100))}`, // Adjust the path as per your data structure
      component: path.resolve("./src/templates/questions.js"), // Path to your template component
      context: {
        question: pageData.question,
        answer: pageData.answer,
        date: pageData.date,
        time: pageData.time,
      },
      defer: false, // Optional - enable deferred static generation
    });
  });
};
