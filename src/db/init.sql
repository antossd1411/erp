DROP DATABASE IF EXISTS `erp`;

CREATE DATABASE `erp`
	CHARACTER SET = 'utf8'
	COLLATE = 'utf8_general_ci';

USE `erp`;

CREATE OR REPLACE TABLE `countries`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	country VARCHAR(50) NOT NULL,
	flag VARCHAR(250) NULL DEFAULT NULL COMMENT 'Country flag image.',
	calling_code SMALLINT NOT NULL UNIQUE,
	locale VARCHAR(6) NOT NULL,
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `countries`
	(country, calling_code, locale)
VALUES
	('SPAIN', 34, 'es-ES'),
	('ITALIA', 39, 'it-IT'),
	('USA', 1, 'en-EN'),
	('VENEZUELA', 58, 'es-VE');

CREATE OR REPLACE TABLE `states`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	country_id INT(11) NOT NULL,
	state VARCHAR(50) NOT NULL,
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT fk_state_country_id FOREIGN KEY (country_id) REFERENCES `countries` (id)
);

INSERT INTO `states`
	(country_id, state)
VALUES
	(1, 'MADRID'),
	(1, 'VALENCIA'),
	(1, 'SEVILLA'),
	(1, 'BARCELONA');

CREATE OR REPLACE TABLE `phone_types`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	phone_type VARCHAR(50) NOT NULL,
	description TEXT NOT NULL DEFAULT '',
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `phone_types`
	(phone_type)
VALUES
	('Mobile'),
	('Work')
;

CREATE OR REPLACE TABLE `user_types`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	user_type VARCHAR(50) NOT NULL,
	description TEXT NOT NULL DEFAULT '',
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `user_types`
	(user_type, description)
VALUES
	('System user', 'Users that can access and manage the system.'),
	('Prospect', 'Possible partner, in process of negotiation.'),
	('Partner', DEFAULT)
;

CREATE OR REPLACE TABLE `dni_types`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	dni_type VARCHAR(50) NOT NULL,
	abbreviation VARCHAR(3) NOT NULL,
	description TEXT NOT NULL DEFAULT '',
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `dni_types`
	(dni_type, abbreviation)
VALUES
	('Passport', 'P')
;

CREATE OR REPLACE TABLE `people`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	dni_type_id INT(11) NOT NULL,
	dni VARCHAR(11) NOT NULL,
	birthdate DATE NULL DEFAULT NULL,
	email VARCHAR(250) NOT NULL UNIQUE,
	type_id INT(11) NOT NULL,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT fk_people_dni_type_id FOREIGN KEY (dni_type_id) REFERENCES `dni_types` (id),
	CONSTRAINT fk_user_type_id FOREIGN KEY (type_id) REFERENCES `user_types` (id)
)
COMMENT 'This table stores general information about the people that is submitted in the system, such as system users, partners, prospects...';

INSERT INTO `people`
	(first_name, last_name, dni_type_id, dni, birthdate, email, type_id)
VALUE
	('Administrador', '', 1, 'YB8765613', '2000-11-14', 'admin@erp.com', 1);

CREATE OR REPLACE TABLE `addresses`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	country_id INT(11) NOT NULL,
	state_id INT(11) NOT NULL,
	people_id INT(11) NOT NULL,
	address TEXT NOT NULL,
	zip_code VARCHAR(6) NOT NULL,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT fk_address_country_id FOREIGN KEY (country_id) REFERENCES `countries` (id),
	CONSTRAINT fk_address_state_id FOREIGN KEY (state_id) REFERENCES `states` (id),
	CONSTRAINT fk_address_people_id FOREIGN KEY (people_id) REFERENCES `people` (id)
);

INSERT INTO `addresses`
	(`country_id`, `state_id`, `people_id`, `address`, `zip_code`)
VALUES
	('1', '1', '1', 'MOSTOLES CALLE RIO TAJUÑA 6 PISO BAJO PUERTA D', '28934');

CREATE OR REPLACE TABLE `phones`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	calling_code SMALLINT NOT NULL,
	`number` VARCHAR(12) NOT NULL,
	people_id INT(11) NOT NULL,
	type_id INT(11) NOT NULL,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fk_phone_people_id` FOREIGN KEY (people_id) REFERENCES `people` (id),
	CONSTRAINT `fk_phone_type_id` FOREIGN KEY (type_id) REFERENCES `phone_types` (id)
);

INSERT INTO `phones`
	(calling_code, `number`, people_id, type_id)
VALUE
	(34, '675636855', 1, 1);

CREATE OR REPLACE TABLE `users`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	people_id INT(11) NOT NULL,
	`password` VARCHAR(250) NOT NULL,
	CONSTRAINT fk_user_people_id FOREIGN KEY (people_id) REFERENCES `people` (id)
)
COMMENT 'This table stores the commplementary data for system users.';

INSERT INTO `users`
	(people_id, `password`)
VALUE
	(1, '123456');

CREATE OR REPLACE TABLE `partners`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	people_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	CONSTRAINT fk_partner_people_id FOREIGN KEY (people_id) REFERENCES `people` (id) ON DELETE NO ACTION,
	CONSTRAINT fk_partner_user_id FOREIGN KEY (user_id) REFERENCES `people` (id) ON DELETE NO ACTION
)
COMMENT 'This table stores the commplementary data for not system users (prospects, partners...).';

CREATE OR REPLACE TABLE `plans`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	description TEXT NOT NULL,
	price FLOAT NOT NULL,
	earn FLOAT NOT NULL COMMENT 'Earn percentage for the user.',
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE OR REPLACE TABLE `subscriptions`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	partner_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	plan_id INT(11) NOT NULL,
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT fk_subscription_partner_id FOREIGN KEY (partner_id) REFERENCES `people` (id) ON DELETE NO ACTION,
	CONSTRAINT fk_subscription_user_id FOREIGN KEY (user_id) REFERENCES `people` (id) ON DELETE NO ACTION,
	CONSTRAINT fk_subscription_plan_id FOREIGN KEY (plan_id) REFERENCES `plans` (id) ON DELETE NO ACTION
)
COMMENT 'This table stores all the plans that a partner can subscribe to during the partnership.';

/*
	NAV BAR MANAGEMENT
*/

CREATE OR REPLACE TABLE `nav_links`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	link VARCHAR(50) NOT NULL COMMENT 'Name or tag of the link.',
	route VARCHAR(50) NOT NULL,
	icon VARCHAR(250) NULL DEFAULT NULL COMMENT 'Link Icon.',
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
)
COMMENT 'This table stores the available links to navigate in the system.';

INSERT INTO `nav_links`
	(link, route)
VALUES
	('Dashboard', 'dashboard'),
	('Partners', 'partners'),
	('Prospects', 'prospects'),
	('Plans', 'plans'),
	('Users', 'users');

/*
	END NAV BAR MANAGEMENT
*/

/*
	TABLE MANAGEMENT
*/

CREATE OR REPLACE TABLE `columns`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`column` VARCHAR(50) NOT NULL,
	`key` VARCHAR(50) NOT NULL COMMENT 'The object key associated to the column. Ex.: name: Name',
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
)
COMMENT 'This table stores all the columns that can be found in all modules info tables.';

INSERT INTO `columns`
	(`column`, `key`)
VALUES
	('Name', 'first_name'),
	('Lastname', 'last_name'),
	('DNI', 'dni'),
	('Birthdate', 'birthdate'),
	('Email', 'email'),
	('Created by', 'user_id'),
	('Creation date', 'creation_date');

CREATE OR REPLACE TABLE `columns_modules`
(
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	module_id INT(11) NOT NULL COMMENT 'Nav link Id.',
	column_id INT(11) NOT NULL,
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT fk_nav_id FOREIGN KEY (module_id) REFERENCES `nav_links` (id),
	CONSTRAINT fk_column_id FOREIGN KEY (column_id) REFERENCES `columns` (id)
)
COMMENT 'This table stores the relations between the modules and the columns of their respective tables.';

INSERT INTO `columns_modules`
	(module_id, column_id)
VALUES
	(2, 1),
	(2, 2),
	(2, 3),
	(2, 4),
	(2, 5),
	(2, 6),
	(2, 7);

/*
	END TABLE MANAGEMENT
*/
