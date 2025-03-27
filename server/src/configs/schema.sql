DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT chk_email CHECK (email LIKE '%@%.%')
);

DROP TABLE IF EXISTS chats;

CREATE TABLE chats (
    id VARCHAR(50) PRIMARY KEY,
    userId1 VARCHAR(50) NOT NULL,
    userId2 VARCHAR(50) NOT NULL,
    CONSTRAINT unique_user_pair UNIQUE (userId1, userId2)
);

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
    id VARCHAR(50) PRIMARY KEY,
    message TEXT NOT NULL,
    senderId VARCHAR(50) NOT NULL,
    chatId VARCHAR(50) NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FOREIGN KEY

ALTER TABLE chats
ADD CONSTRAINT fk_userId1 FOREIGN KEY (userId1) REFERENCES users(id),
ADD CONSTRAINT fk_userId2 FOREIGN KEY (userId2) REFERENCES users(id);

ALTER TABLE messages
ADD CONSTRAINT fk_senderId FOREIGN KEY (senderId) REFERENCES users(id),
ADD CONSTRAINT fk_chatId FOREIGN KEY (chatId) REFERENCES chats(id);