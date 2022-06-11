-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema d-buggy_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema d-buggy_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `d-buggy_db` DEFAULT CHARACTER SET utf8 ;
USE `d-buggy_db` ;

-- -----------------------------------------------------
-- Table `d-buggy_db`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `d-buggy_db`.`category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `category_id_UNIQUE` (`category_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `d-buggy_db`.`organization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `d-buggy_db`.`organization` (
  `organization_id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`organization_id`),
  UNIQUE INDEX `organization_id_UNIQUE` (`organization_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `d-buggy_db`.`tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `d-buggy_db`.`tickets` (
  `ticket_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `category_category_id` INT NOT NULL,
  `organization_organization_id` INT NOT NULL,
  PRIMARY KEY (`ticket_id`, `category_category_id`, `organization_organization_id`),
  INDEX `fk_tickets_category1_idx` (`category_category_id` ASC) VISIBLE,
  INDEX `fk_tickets_organization1_idx` (`organization_organization_id` ASC) VISIBLE,
  CONSTRAINT `fk_tickets_category1`
    FOREIGN KEY (`category_category_id`)
    REFERENCES `d-buggy_db`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tickets_organization1`
    FOREIGN KEY (`organization_organization_id`)
    REFERENCES `d-buggy_db`.`organization` (`organization_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `d-buggy_db`.`roll`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `d-buggy_db`.`roll` (
  `roll_id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`roll_id`),
  UNIQUE INDEX `roll_id_UNIQUE` (`roll_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `d-buggy_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `d-buggy_db`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `roll_roll_id` INT NOT NULL,
  `organization_organization_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `roll_roll_id`, `organization_organization_id`),
  INDEX `fk_users_roll1_idx` (`roll_roll_id` ASC) VISIBLE,
  INDEX `fk_users_organization1_idx` (`organization_organization_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_roll1`
    FOREIGN KEY (`roll_roll_id`)
    REFERENCES `d-buggy_db`.`roll` (`roll_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_organization1`
    FOREIGN KEY (`organization_organization_id`)
    REFERENCES `d-buggy_db`.`organization` (`organization_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `d-buggy_db`.`assigned_tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `d-buggy_db`.`assigned_tickets` (
  `users_user_id` INT NOT NULL,
  `tickets_ticket_id` INT NOT NULL,
  `assigned_date` DATETIME NOT NULL,
  PRIMARY KEY (`users_user_id`, `tickets_ticket_id`),
  INDEX `fk_users_has_tickets_tickets1_idx` (`tickets_ticket_id` ASC) VISIBLE,
  INDEX `fk_users_has_tickets_users1_idx` (`users_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_tickets_users1`
    FOREIGN KEY (`users_user_id`)
    REFERENCES `d-buggy_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_tickets_tickets1`
    FOREIGN KEY (`tickets_ticket_id`)
    REFERENCES `d-buggy_db`.`tickets` (`ticket_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
