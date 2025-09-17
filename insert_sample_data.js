// Sample data insertion script
// Run with: node insert_sample_data.js

const mysql = require('mysql2');
require('dotenv').config();

// Create connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'feedback_system',
  // Add password if needed
  // password: process.env.DB_PASSWORD,
});

// Sample feedback data
const feedbackData = [
  { name: 'Priya', email: 'test@test.com', feedback: 'The vibes here were positive and refreshing, I enjoyed the entire event.', colorTheme: 'blue' },
  { name: 'Raj', email: 'test@test.com', feedback: 'This was one of the most memorable activities I have ever tried.', colorTheme: 'red' },
  { name: 'Saanvi', email: 'test@test.com', feedback: 'One of the best activities I have tried, so much joy received.', colorTheme: 'green' },
  { name: 'Sneha', email: 'test@test.com', feedback: 'The overall experience was amazing, I really enjoyed every single moment.', colorTheme: 'yellow' },
  { name: 'Aadhya', email: 'test@test.com', feedback: 'I found the experience extremely fun and relaxing, definitely worth a visit.', colorTheme: 'purple' },
  { name: 'Kiara', email: 'test@test.com', feedback: 'The entire activity felt rewarding, I am glad I decided to try.', colorTheme: 'blue' },
  { name: 'Vivaan', email: 'test@test.com', feedback: 'The setup looked very impressive and modern, I enjoyed my time completely.', colorTheme: 'red' },
  { name: 'Sai', email: 'test@test.com', feedback: 'An amazing day spent here, I will surely come back very soon.', colorTheme: 'green' },
  { name: 'Reyansh', email: 'test@test.com', feedback: 'The atmosphere was vibrant and welcoming, I felt very relaxed throughout.', colorTheme: 'yellow' },
  { name: 'Krishna', email: 'test@test.com', feedback: 'The activity was simple yet very engaging, I absolutely loved the experience.', colorTheme: 'purple' },
  { name: 'Arjun', email: 'test@test.com', feedback: 'The environment felt safe and enjoyable, it exceeded all of my expectations.', colorTheme: 'blue' },
  { name: 'Anika', email: 'test@test.com', feedback: 'A very unique and fun concept, I truly had a fantastic time.', colorTheme: 'red' },
  { name: 'Rahul', email: 'test@test.com', feedback: 'The friendly team and positive environment made it a very happy day.', colorTheme: 'green' },
  { name: 'Rohan', email: 'test@test.com', feedback: 'The service was professional and smooth, I felt valued as a customer here.', colorTheme: 'yellow' },
  { name: 'Aarohi', email: 'test@test.com', feedback: 'Great place to relax and have fun, I recommend it to everyone.', colorTheme: 'purple' },
  { name: 'Manish', email: 'test@test.com', feedback: 'I had a wonderful time here, everything was arranged so perfectly.', colorTheme: 'blue' },
  { name: 'Meera', email: 'test@test.com', feedback: 'Everything was well organized and smooth, truly a five star experience today.', colorTheme: 'red' },
  { name: 'Simran', email: 'test@test.com', feedback: 'The staff were very polite and friendly, made me feel comfortable instantly.', colorTheme: 'green' },
  { name: 'Vikas', email: 'test@test.com', feedback: 'It felt exciting, comfortable, and very memorable, I will never forget.', colorTheme: 'yellow' },
  { name: 'Navya', email: 'test@test.com', feedback: 'I had so much fun here, the overall vibe was really great.', colorTheme: 'purple' },
  { name: 'Akash', email: 'test@test.com', feedback: 'I enjoyed the service a lot, definitely worth the time and money.', colorTheme: 'blue' },
  { name: 'Riya', email: 'test@test.com', feedback: 'I liked every part of the session, it was absolutely worth the effort.', colorTheme: 'red' },
  { name: 'Kabir', email: 'test@test.com', feedback: 'I loved how professional and friendly the team was during the session.', colorTheme: 'green' },
  { name: 'Isha', email: 'test@test.com', feedback: 'Such an enjoyable activity with friends, I would love to return again.', colorTheme: 'yellow' },
  { name: 'Myra', email: 'test@test.com', feedback: 'It was exciting, engaging, and very entertaining, I would love to repeat.', colorTheme: 'purple' },
  { name: 'Ananya', email: 'test@test.com', feedback: 'It was fun, exciting, and overall a really refreshing experience today.', colorTheme: 'blue' },
  { name: 'Pooja', email: 'test@test.com', feedback: 'This was more fun than I expected, truly a delightful experience overall.', colorTheme: 'red' },
  { name: 'Pari', email: 'test@test.com', feedback: 'It was creative, enjoyable, and perfectly managed, I am fully satisfied.', colorTheme: 'green' },
  { name: 'Vihaan', email: 'test@test.com', feedback: 'Such a cool place to be, I highly recommend visiting it once.', colorTheme: 'yellow' }
];

// Insert each feedback
async function insertAllFeedback() {
  console.log(`Starting to insert ${feedbackData.length} feedback entries...`);
  let successCount = 0;

  for (const feedback of feedbackData) {
    try {
      await insertFeedback(feedback);
      successCount++;
      console.log(`Inserted feedback from ${feedback.name} (${successCount}/${feedbackData.length})`);
    } catch (error) {
      console.error(`Failed to insert feedback from ${feedback.name}:`, error.message);
    }
  }

  console.log(`Finished! Successfully inserted ${successCount} out of ${feedbackData.length} feedback entries.`);
  connection.end();
}

// Promise wrapper for inserting single feedback
function insertFeedback(feedback) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO feedbacks (name, email, feedback, color_theme) VALUES (?, ?, ?, ?)';
    
    connection.execute(
      query,
      [feedback.name, feedback.email, feedback.feedback, feedback.colorTheme],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}

// Run the insertion
insertAllFeedback().catch(err => {
  console.error('Error in insertion process:', err);
  connection.end();
});