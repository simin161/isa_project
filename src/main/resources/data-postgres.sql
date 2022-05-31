INSERT INTO loyalty_program values (1, 23.4, 'shark', 0,  40);
INSERT INTO location values (1, 'Forgotten town', 'Belgrade', 23.5, 44.5, '64', 4);

--USERS BEGIN--
-- User 1: - Customer -> UserType = 0
INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (1, 'a', 'a', 'a', 'mail@mail.com', 'Papi', true, false, 'Papi', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 0, '');
INSERT INTO customer values (45,0, 1, 1);
INSERT INTO public.penal(id, customer, number)
    VALUES(1, 1, 5);
-- User 2,3: Bungalow owner -> UserType = 1git
INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (2, 'a', 'a', 'a', 'zokaMagic@mail.com', 'Zorica', true, false, 'Markovic', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 1, '');
INSERT INTO bungalow_owner values ('I just want to drink rakia with my comrades',0, 2, 1);
--
INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (3, 'a', 'a', 'a', 'peterParker@mail.com', 'Peter', true, false, 'Parker', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 1, '');
INSERT INTO bungalow_owner values ('I just want to drink rakia with my comrades',0, 3, 1);

-- User 4,5: Boat owner -> UserType = 2
INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (4, 'a', 'a', 'a', 'zokiSumi@mail.com', 'Zoran', true, false, 'Sumadinac', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 2, '');
INSERT INTO boat_owner values ('200',0, 4, 1);
--
INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (5, 'a', 'a', 'a', 'superman@mail.com', 'Clark', true, false, 'Kent', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 2, '');
INSERT INTO boat_owner values ('200',0, 5, 1);

-- User 6,7 Instructor -> UserType = 3
INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (6, 'a', 'a', 'a', 'vesnaVuki@mail.com', 'Vesna Vendi', true, false, 'Vukelic', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 3, '');
INSERT INTO instructor values ('This is healthy, and this is healthy ooooaaa','Hjaaaa hjaaaoooaaaaaa hjaaaa',0, 6, 1);

INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (7, 'a', 'a', 'a', 'woderwoman@mail.com', 'Wunder', true, false, 'Wuman', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 3, '');
INSERT INTO instructor values ('This is healthy, and this is healthy ooooaaa','Hjaaaa hjaaaoooaaaaaa hjaaaa',0, 7, 1);

--USERS END----ENGINES BEGIN--
INSERT INTO public.engine(
	id, max_speed, number_of_engines, power)
	VALUES (1, 450, 5, 2500);
--ENGINES END--

--OFFERS BEGIN--
INSERT INTO public.offer(
    id, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(1, 'No cancellation policies _namyg_', 'Very hot and sexy bungy', 5, 'Bungy Wumby', 0, 4.0, 'Sex, drugs and alcohol', 10.5, 2, 1);
INSERT INTO public.bungalow(number_of_beds, number_of_rooms, id)
    VALUES(2, 2, 1);

INSERT INTO public.offer(
    id, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(2, 'No cancellation policies _namyg_', 'Very hot and sexy bungy', 2, 'Bungy Lumby', 0, 5.0, 'Sex, drugs and alcohol', 12.5, 2, 1);
INSERT INTO public.bungalow(number_of_beds, number_of_rooms, id)
    VALUES(4, 2, 2);

INSERT INTO public.offer(
    id, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(3, 'No cancellation policies _namyg_', 'Very hot and sexy bungy', 10, 'Bungy Expensive Jumby', 0, 5.0, 'Sex, drugs and alcohol', 50.0, 3, 1);
INSERT INTO public.bungalow(number_of_beds, number_of_rooms, id)
    VALUES(10, 2, 3);

INSERT INTO public.offer(
    id, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(4, 'No cancellation policies _namyg_', 'Very hot and sexy bungy', 2, 'Coursy Wumby', 2, 3.5, 'Sex, drugs and alcohol', 10.5, 6, 1);

INSERT INTO public.offer(
    id, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(5, 'No cancellation policies _namyg_', 'Very hot and sexy bungy', 2, 'Boaty Wumby', 1, 4.8, 'Sex, drugs and alcohol', 10.5, 4, 1);
INSERT INTO public.boat(boat_length, boat_type, id, engine)
    VALUES(500.0,'very big boat', 5, 1);
--OFFERS END--

-- ADDITIONAL SERVICES START --
insert into additional_service(name, type) values ('Wi-fi', 'ADDITIONAL_SERVICE'); -- 1
insert into additional_service(name, type) values ('Parking', 'ADDITIONAL_SERVICE'); -- 2

insert into additional_service(name, type) values ('Nets', 'FISHING_TOOL'); -- 3
insert into additional_service(name, type) values ('Hooks', 'FISHING_TOOL'); -- 4
insert into additional_service(name, type) values ('Traps', 'FISHING_TOOL'); -- 5

insert into additional_service(name, type) values ('GPS', 'NAVIGATIONAL_TOOL'); -- 6
insert into additional_service(name, type) values ('Compass', 'NAVIGATIONAL_TOOL'); -- 7
insert into additional_service(name, type) values ('Auto Pilot', 'NAVIGATIONAL_TOOL'); -- 8

insert into offer_additional_service(offer_id, additional_service_id) values(1,1);
insert into offer_additional_service(offer_id, additional_service_id) values(2,2);
insert into offer_additional_service(offer_id, additional_service_id) values(3,1);

insert into offer_additional_service(offer_id, additional_service_id) values(4,3);

insert into offer_additional_service(offer_id, additional_service_id) values(5,3);
insert into offer_additional_service(offer_id, additional_service_id) values(5,6);


-- ADDITIONAL SERVICES END --

--TERMS START--
INSERT INTO public.bungalow_term(id, start_time, end_time, bungalow_id)
    values(1, '2022-06-06 10:00:00',  '2022-06-12 10:00:00' , 1);
INSERT INTO public.bungalow_term(id, start_time, end_time, bungalow_id)
        values(2, '2022-06-13 10:00:00',  '2022-06-14 10:00:00' , 1);
INSERT INTO public.bungalow_term(id, start_time, end_time, bungalow_id)
    values(3, '2022-05-22 10:00:00',  '2022-05-23 10:00:00' , 2);
INSERT INTO public.bungalow_term(id, start_time, end_time, bungalow_id)
    values(4, '2022-05-30 10:00:00',  '2022-07-23 10:00:00' , 2);
--TERMS END--

--DELETE REQUEST BEGIN--
INSERT INTO public.delete_request(id, explanation, status, users)
	VALUES (1, 'I just want to die, thank you goodbye <3', 0, 1);
--DELETE REQUEST END--
--USER FEEDBACK START--
 INSERT INTO public.user_feedback VALUES (1, 'Too hot for me', 3, 0, 1, 1);
 INSERT INTO public.user_feedback VALUES (2, 'I don''t know why "coursy wumby"???', 4, 0, 1, 4);
 INSERT INTO public.user_feedback VALUES (3, 'Belly dancing with papa shark was better than this sh*t', 2, 0, 1, 3);
--USER FEEDBACK END--