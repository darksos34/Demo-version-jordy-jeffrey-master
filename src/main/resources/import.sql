INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

INSERT INTO users(created_at, updated_at, email, password, username) VALUES ('2020-04-21 12:52:27', '2020-04-21 12:52:27', 'user@urhere.com', '$2a$10$UmRYbIepLhb/gDdQexRE.O/2KTEuKcXviB1lVIIgKb8TSMYFL.RSS', 'user');
INSERT INTO users(created_at, updated_at, email, password, username) VALUES ('2020-04-21 12:53:01', '2020-04-21 12:53:01', 'moderator@urhere.com', '$2a$10$jb5FV5BKswGBjD4/wnKEou6lJEgmvbWEFo6S5ky7WcEJBWdILE2PG', 'moderator');
INSERT INTO users(created_at, updated_at, email, password, username) VALUES ('2020-04-21 12:53:30', '2020-04-21 12:53:30', 'admin@urhere.com', '$2a$10$p9fagvla7mWMtMreohaYy..VS/oRGMaft//2jqWc4Bh5VERlqa8SG', 'admin');

INSERT INTO user_roles(user_id, role_id) VALUES ('1', '1');
INSERT INTO user_roles(user_id, role_id) VALUES ('2', '1');
INSERT INTO user_roles(user_id, role_id) VALUES ('2', '2');
INSERT INTO user_roles(user_id, role_id) VALUES ('3', '1');
INSERT INTO user_roles(user_id, role_id) VALUES ('3', '2');
INSERT INTO user_roles(user_id, role_id) VALUES ('3', '3');