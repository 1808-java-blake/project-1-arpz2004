CREATE SCHEMA reimbursement_system;
SET SCHEMA 'reimbursement_system';

CREATE TABLE user_role
(
    role_id SERIAL NOT NULL,
    role VARCHAR(10),
    PRIMARY KEY(role_id)
);

CREATE TABLE ers_user
(
    user_id SERIAL NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    role_id INTEGER NOT NULL,
    PRIMARY KEY(user_id),
    FOREIGN KEY(role_id) REFERENCES user_role(role_id)
);

CREATE TABLE reimbursement_status
(
    status_id SERIAL NOT NULL,
    status VARCHAR(10),
    PRIMARY KEY(status_id)
);

CREATE TABLE reimbursement_type
(
    type_id SERIAL NOT NULL,
    type VARCHAR(10),
    PRIMARY KEY(type_id)
);

CREATE TABLE reimbursement
(
    reimbursement_id SERIAL NOT NULL,
    amount NUMERIC(8,2) NOT NULL,
    submitted TIMESTAMP NOT NULL,
    resolved TIMESTAMP,
    description VARCHAR(250),
    author_id INTEGER NOT NULL,
    resolver_id INTEGER,
    status_id INTEGER NOT NULL,
    type_id INTEGER NOT NULL,
    PRIMARY KEY(reimbursement_id),
    FOREIGN KEY(author_id) REFERENCES ers_user(user_id),
    FOREIGN KEY(resolver_id) REFERENCES ers_user(user_id),
    FOREIGN KEY(status_id) REFERENCES reimbursement_status(status_id),
    FOREIGN KEY(type_id) REFERENCES reimbursement_type(type_id)
);

INSERT INTO user_role(role)
VALUES('employee'), ('manager');

INSERT INTO reimbursement_status(status)
VALUES('pending'), ('approved'), ('denied');

INSERT INTO reimbursement_type(type)
VALUES('lodging'), ('travel'), ('food'), ('other');