-- Migration: Add reward, punishment, and deadline columns to tasks
ALTER TABLE tasks
ADD COLUMN reward TEXT;

ALTER TABLE tasks
ADD COLUMN punishment TEXT;

ALTER TABLE tasks
ADD COLUMN deadline DATETIME;
