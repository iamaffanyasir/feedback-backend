-- SQL script to insert sample feedback data
-- Run this in phpMyAdmin or MySQL command line after selecting the feedback_system database

USE feedback_system;

-- Insert sample feedback data with different color themes
INSERT INTO feedbacks (name, email, feedback, color_theme) VALUES
('Priya', 'test@test.com', 'The vibes here were positive and refreshing, I enjoyed the entire event.', 'blue'),
('Raj', 'test@test.com', 'This was one of the most memorable activities I have ever tried.', 'red'),
('Saanvi', 'test@test.com', 'One of the best activities I have tried, so much joy received.', 'green'),
('Sneha', 'test@test.com', 'The overall experience was amazing, I really enjoyed every single moment.', 'yellow'),
('Aadhya', 'test@test.com', 'I found the experience extremely fun and relaxing, definitely worth a visit.', 'purple'),
('Kiara', 'test@test.com', 'The entire activity felt rewarding, I am glad I decided to try.', 'blue'),
('Vivaan', 'test@test.com', 'The setup looked very impressive and modern, I enjoyed my time completely.', 'red'),
('Sai', 'test@test.com', 'An amazing day spent here, I will surely come back very soon.', 'green'),
('Reyansh', 'test@test.com', 'The atmosphere was vibrant and welcoming, I felt very relaxed throughout.', 'yellow'),
('Krishna', 'test@test.com', 'The activity was simple yet very engaging, I absolutely loved the experience.', 'purple'),
('Arjun', 'test@test.com', 'The environment felt safe and enjoyable, it exceeded all of my expectations.', 'blue'),
('Anika', 'test@test.com', 'A very unique and fun concept, I truly had a fantastic time.', 'red'),
('Rahul', 'test@test.com', 'The friendly team and positive environment made it a very happy day.', 'green'),
('Rohan', 'test@test.com', 'The service was professional and smooth, I felt valued as a customer here.', 'yellow'),
('Aarohi', 'test@test.com', 'Great place to relax and have fun, I recommend it to everyone.', 'purple'),
('Manish', 'test@test.com', 'I had a wonderful time here, everything was arranged so perfectly.', 'blue'),
('Meera', 'test@test.com', 'Everything was well organized and smooth, truly a five star experience today.', 'red'),
('Simran', 'test@test.com', 'The staff were very polite and friendly, made me feel comfortable instantly.', 'green'),
('Vikas', 'test@test.com', 'It felt exciting, comfortable, and very memorable, I will never forget.', 'yellow'),
('Navya', 'test@test.com', 'I had so much fun here, the overall vibe was really great.', 'purple'),
('Akash', 'test@test.com', 'I enjoyed the service a lot, definitely worth the time and money.', 'blue'),
('Riya', 'test@test.com', 'I liked every part of the session, it was absolutely worth the effort.', 'red'),
('Kabir', 'test@test.com', 'I loved how professional and friendly the team was during the session.', 'green'),
('Isha', 'test@test.com', 'Such an enjoyable activity with friends, I would love to return again.', 'yellow'),
('Myra', 'test@test.com', 'It was exciting, engaging, and very entertaining, I would love to repeat.', 'purple'),
('Ananya', 'test@test.com', 'It was fun, exciting, and overall a really refreshing experience today.', 'blue'),
('Pooja', 'test@test.com', 'This was more fun than I expected, truly a delightful experience overall.', 'red'),
('Pari', 'test@test.com', 'It was creative, enjoyable, and perfectly managed, I am fully satisfied.', 'green'),
('Vihaan', 'test@test.com', 'Such a cool place to be, I highly recommend visiting it once.', 'yellow');

-- Verify the insertion
SELECT * FROM feedbacks ORDER BY created_at DESC;