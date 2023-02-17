
CREATE DATABASE IF NOT EXISTS db;
USE db;

CREATE TABLE IF NOT EXISTS `chat` (
  `id` VARCHAR(255),
  `active` BOOLEAN,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `rooms` (
  `id` VARCHAR(255),
  `active` BOOLEAN,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(255) NOT NULL PRIMARY KEY,
  `chatId` VARCHAR(255),
  `active` BOOLEAN,
  `joinedAt` DATETIME,
  `leftAt` DATETIME
);

CREATE TABLE IF NOT EXISTS `messages` (
  `id` VARCHAR(255) NOT NULL PRIMARY KEY,
  `chatId` VARCHAR(255),
  `origin` VARCHAR(255),
  `text` VARCHAR(255),
  createdAt DATETIME
);

CREATE TABLE IF NOT EXISTS `chat_messages` (
`chat_id` VARCHAR(255) NOT NULL,
`message` VARCHAR(255) NOT NULL,
`createdAt` DATETIME,
PRIMARY KEY(`chat_id`, `message`)
);