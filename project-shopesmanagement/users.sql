CREATE TABLE `userslist`.`users` (
  `id` INT NULL,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `verified` VARCHAR(45) NOT NULL DEFAULT 'false',
  `role` VARCHAR(45) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`email`));
-- ALTER TABLE `userslist`.`users` 
-- CHANGE COLUMN `id` `id` INT NULL AUTO_INCREMENT ;
-- ALTER TABLE `userslist`.`users` 
-- CHANGE COLUMN `id` `id` INT NOT NULL ;
