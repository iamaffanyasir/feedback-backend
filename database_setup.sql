-- Create the feedback_system database
CREATE DATABASE IF NOT EXISTS feedback_system;

-- Use the feedback_system database
USE feedback_system;

-- Create feedbacks table
CREATE TABLE feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    feedback TEXT NOT NULL,
    color_theme VARCHAR(50) DEFAULT 'blue',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index for better performance on queries
CREATE INDEX idx_created_at ON feedbacks(created_at);
CREATE INDEX idx_color_theme ON feedbacks(color_theme);

-- Insert some sample data for testing (optional)
INSERT INTO feedbacks (name, email, feedback, color_theme) VALUES
('John Doe', 'john@example.com', 'Great experience! Love the interactive feedback system.', 'blue'),
('Jane Smith', 'jane@example.com', 'Amazing interface and smooth animations.', 'red'),
('Mike Johnson', 'mike@example.com', 'Very innovative approach to collecting feedback.', 'green'),
('Sarah Wilson', 'sarah@example.com', 'The paper animation is so cool!', 'yellow'),
('David Brown', 'david@example.com', 'Easy to use and engaging interface.', 'purple');

-- Show the created table structure
DESCRIBE feedbacks;

-- Show sample data
SELECT * FROM feedbacks ORDER BY created_at DESC;
