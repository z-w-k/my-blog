CREATE TABLE users (
  userId INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL
);
INSERT INTO users(username, password, email)
VALUES('admin', '123456', 'admin@example.com'),
('user1', '123456', 'user1@example.com'),
('user2', '123456', 'user2@example.com');


CREATE TABLE posts (
  postId INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  description VARCHAR(255) NOT NULL,
  userId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(userId)
);