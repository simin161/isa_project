--AUTHORITIES BEGIN--
INSERT INTO authority values (1, 'ROLE_CUSTOMER');
INSERT INTO authority values (2, 'ROLE_BUNGALOW');
INSERT INTO authority values (3, 'ROLE_BOAT');
INSERT INTO authority values (4, 'ROLE_INSTRUCTOR');
INSERT INTO authority values (5, 'ROLE_ADMIN');
INSERT INTO authority values (6, 'ROLE_COMMON');
--AUTHORITIES END--
--LOCATIONS BEGIN--
INSERT INTO location values (1, 'Forgotten town', 'Belgrade', 23.5, 44.5, '64', 4);
--LOCATIONS END--
--LOYALTY PROGRAM BEGIN--
INSERT INTO loyalty_program values (1, 23.4, 'shark', 0,  40);
--LOYALTY PROGRAM END--
--USERS BEGIN--
-- User 1: - Customer -> UserType = 0
INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (1, 'a', 'a', 'a', 'mail@mail.com', 'Papi', true, false, 'Papi', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 0, '');
INSERT INTO customer values (45,0, 1, 1);
INSERT INTO public.penal(id, customer, number)
    VALUES(1, 1, 2);
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

INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (8, 'a', 'a', 'a', 'admin@admin.com', 'Papi', true, false, 'Papi', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 4, '');

--USERS END--

--ENGINES BEGIN--

INSERT INTO public.engine(
	id, max_speed, number_of_engines, power)
	VALUES (1, 450, 5, 2500);
--ENGINES END--

--OFFERS BEGIN--
INSERT INTO public.offer(
    id, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(1, 'In case of cancellation -> half of the price is returned', 'Bungalow at seaside. 5 minutes walking distance to beach.', 5, 'Nikos', 0, 4.0, 'Rest time from 15h to 18h.', 10.5, 2, 1);
INSERT INTO public.bungalow(number_of_beds, number_of_rooms, id)
    VALUES(2, 2, 1);

INSERT INTO public.offer(
    id, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(2, 'In case of cancellation -> full price is returned', 'Bungalow in the middle of swamp', 2, 'Shrek house', 0, 5.0, 'No rules of conduct', 12.5, 2, 1);
INSERT INTO public.bungalow(number_of_beds, number_of_rooms, id)
    VALUES(4, 2, 2);

INSERT INTO public.offer(
    id, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(3, 'No cancellation policies', 'Castle-like bungalow', 10, 'Fiona', 0, 5.0, 'No rules of conduct', 50.0, 3, 1);
INSERT INTO public.bungalow(number_of_beds, number_of_rooms, id)
    VALUES(10, 2, 3);

INSERT INTO public.offer(
    id, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(4, 'In case of cancellation -> 2/3 of price is returned', 'Exploring the nature of Nile. Kids belove 15 are not allowed', 2, 'Racing with the hippos', 2, 3.5, 'Must not separate from the group', 10.5, 6, 1);
INSERT INTO public.course(
	id)
	VALUES (4);
INSERT INTO public.offer(
    id, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(5, 'No cancellation policies', 'Big boat, might sink', 2, 'Titanik', 1, 4.8, 'No rules of conduct', 10.5, 4, 1);
INSERT INTO public.boat(boat_length, boat_type, id, engine)
    VALUES(500.0,'sinking boat', 5, 1);
--OFFERS END--

-- ADDITIONAL SERVICES START --
INSERT INTO additional_service(id, name, type) VALUES (1, 'Wi-fi', 'ADDITIONAL_SERVICE');
INSERT INTO additional_service(id, name, type) VALUES (2, 'Parking', 'ADDITIONAL_SERVICE');
INSERT INTO additional_service(id, name, type) VALUES (3, 'Nets', 'FISHING_TOOL');
INSERT INTO additional_service(id, name, type) VALUES (4, 'Hooks', 'FISHING_TOOL');
INSERT INTO additional_service(id, name, type) VALUES (5, 'Traps', 'FISHING_TOOL');
INSERT INTO additional_service(id, name, type) VALUES (6, 'GPS', 'NAVIGATIONAL_TOOL');
INSERT INTO additional_service(id, name, type) VALUES (7, 'Compass', 'NAVIGATIONAL_TOOL');
INSERT INTO additional_service(id, name, type) VALUES (8, 'Auto Pilot', 'NAVIGATIONAL_TOOL');

INSERT INTO offer_additional_service(offer_id, additional_service_id) VALUES(1,1);
INSERT INTO offer_additional_service(offer_id, additional_service_id) VALUES(2,2);
INSERT INTO offer_additional_service(offer_id, additional_service_id) VALUES(3,1);
INSERT INTO offer_additional_service(offer_id, additional_service_id) VALUES(4,3);
INSERT INTO offer_additional_service(offer_id, additional_service_id) VALUES(5,3);
INSERT INTO offer_additional_service(offer_id, additional_service_id) VALUES(5,6);
-- ADDITIONAL SERVICES END --

--TERMS START--
-- TODO: Inserting terms...
INSERT INTO public.term(id, start_date, end_date, offer)
     values(1, '2022-06-06T10:00:00',  '2022-06-12T10:00:00' , 1); -- Bungy Wumby
INSERT INTO public.term(id, start_date, end_date, offer)
     values(2, '2022-07-06T10:00:00',  '2022-07-12T10:00:00' , 1); -- Bungy Wumby
INSERT INTO public.term(id, start_date, end_date, offer)
     values(3, '2022-09-01T10:00:00',  '2022-09-30T10:00:00' , 1);
--TERMS END--

--RESERVATIONS START--
-- TODO: Inserting reservations...
INSERT INTO public.reservation(id, start_date, end_date, reservation_status, reservation_type, customer, offer, number_of_people, total_price, discount, has_complaint, has_feedback, additional_services, duration, version)
    values(1, '2022-08-31T10:00:00',  '2022-09-01T10:00:00' , 0, 1, null,1,2,200, 0.0, false, false, 'Wi-Fi', 9, 1 );
INSERT INTO public.reservation(id, start_date, end_date, reservation_status, reservation_type, customer, offer, number_of_people, total_price, discount, has_complaint, has_feedback, additional_services, duration, version)
    values(2, '2022-07-09T10:00:00',  '2022-07-11T10:00:00' , 0, 0, 1,1,2,200, 0.0, false, false, 'Wi-Fi', 5, 1 );
INSERT INTO public.reservation(id, start_date, end_date, reservation_status, reservation_type, customer, offer, number_of_people, total_price, discount, has_complaint, has_feedback, additional_services, duration, version)
        values(3, '2022-07-09T10:00:00',  '2022-07-11T10:00:00' , 0, 1, null,1,2,200, 25.0, false, false, 'Wi-Fi', 5, 1 );
INSERT INTO public.reservation(id, start_date, end_date, reservation_status, reservation_type, customer, offer, number_of_people, total_price, discount, has_complaint, has_feedback, additional_services, duration, version)
        values(4, '2022-07-015T10:00:00',  '2022-07-20T10:00:00' , 0, 0, 1,4,2,200, 0.0, false, false, 'Wi-Fi', 5, 1 );
INSERT INTO public.reservation(id, start_date, end_date, reservation_status, reservation_type, customer, offer, number_of_people, total_price, discount, has_complaint, has_feedback, additional_services, duration, version)
        values(5, '2022-08-015T10:00:00',  '2022-08-20T10:00:00' , 0, 0, 1,5,2,200, 0.0, false, false, 'Wi-Fi', 5, 1 );
INSERT INTO public.reservation(id, start_date, end_date, reservation_status, reservation_type, customer, offer, number_of_people, total_price, discount, has_complaint, has_feedback, additional_services, duration, version)
        values(6, '2022-05-015T10:00:00',  '2022-05-25T10:00:00' , 0, 0, 1,4,2,200, 0.0, false, false, 'Wi-Fi', 10, 1 );
INSERT INTO public.reservation(id, start_date, end_date, reservation_status, reservation_type, customer, offer, number_of_people, total_price, discount, has_complaint, has_feedback, additional_services, duration, version)
        values(7, '2022-04-015T10:00:00',  '2022-04-25T10:00:00' , 0, 0, 1,5,2,200, 0.0, false, false, 'Wi-Fi', 10, 1 );
INSERT INTO public.reservation(id, start_date, end_date, reservation_status, reservation_type, customer, offer, number_of_people, total_price, discount, has_complaint, has_feedback, additional_services, duration, version)
        values(8, '2022-09-015T10:00:00',  '2022-09-20T10:00:00' , 0, 0, 1,4,2,200, 0.0, false, false, 'Wi-Fi', 5, 1 );
INSERT INTO public.reservation(id, start_date, end_date, reservation_status, reservation_type, customer, offer, number_of_people, total_price, discount, has_complaint, has_feedback, additional_services, duration, version)
        values(9, '2022-09-025T10:00:00',  '2022-09-30T10:00:00' , 0, 0, 1,5,2,200, 0.0, false, false, 'Wi-Fi', 5, 1 );
INSERT INTO public.reservation(id, start_date, end_date, reservation_status, reservation_type, customer, offer, number_of_people, total_price, discount, has_complaint, has_feedback, additional_services, duration, version)
        values(10, '2022-10-10T10:00:00',  '2022-10-20T10:00:00' , 0, 1, null,1,2,250, 15.0, false, false, 'Wi-Fi', 10, 1 );
-- TODO: Inserting boatReservations... (reservation with 'captain' field)
--INSERT INTO public.boat_reservation(id, captain) -- captain should be boatOwner (userId: 4 or 5)
 --  VALUES(2,4);
--RESERVATIONS END--



--DELETE REQUEST BEGIN--
INSERT INTO public.delete_request(id, explanation, status, users)
	VALUES (1, 'I just want to die, thank you goodbye <3', 0, 1);
--DELETE REQUEST END--
--USER FEEDBACK START--
INSERT INTO public.user_feedback(
	id, content_for_offer, content_for_owner, rate_offer, rate_owner, status, reservation)
	VALUES (1, 'Nice offer', 'Nice owner', 4, 4, 1 , 1);
INSERT INTO public.user_feedback(
	id, content_for_offer, content_for_owner, rate_offer, rate_owner, status, reservation)
	VALUES (2, 'Nice offer1', 'Nice owner2', 4, 4, 1 , 1);
INSERT INTO public.user_feedback(
	id, content_for_offer, content_for_owner, rate_offer, rate_owner, status, reservation)
	VALUES (3, 'Nice offer1', 'Nice owner2', 4, 4, 1 , 5);
INSERT INTO public.user_feedback(
	id, content_for_offer, content_for_owner, rate_offer, rate_owner, status, reservation)
	VALUES (4, 'Nice offer1', 'Nice owner2', 4, 4, 1 , 6);
--USER FEEDBACK END--

--USER AUTHORITIES BEGIN--
INSERT INTO public.user_authority(
	user_id, authority_id)
	VALUES (1, 1);
INSERT INTO public.user_authority(
	user_id, authority_id)
	VALUES (1, 6);
INSERT INTO public.user_authority(
	user_id, authority_id)
	VALUES (2, 2);
INSERT INTO public.user_authority(
    user_id, authority_id)
    VALUES (2, 6);
INSERT INTO public.user_authority(
	user_id, authority_id)
	VALUES (3, 2);
INSERT INTO public.user_authority(
    user_id, authority_id)
    VALUES (3, 6);
INSERT INTO public.user_authority(
	user_id, authority_id)
	VALUES (4, 3);
INSERT INTO public.user_authority(
    user_id, authority_id)
    VALUES (4, 6);
INSERT INTO public.user_authority(
	user_id, authority_id)
	VALUES (5, 3);
INSERT INTO public.user_authority(
    user_id, authority_id)
    VALUES (5, 6);
INSERT INTO public.user_authority(
	user_id, authority_id)
	VALUES (6, 4);
INSERT INTO public.user_authority(
    user_id, authority_id)
    VALUES (6, 6);
INSERT INTO public.user_authority(
	user_id, authority_id)
	VALUES (7, 4);
INSERT INTO public.user_authority(
    user_id, authority_id)
    VALUES (7, 6);
--USER AUTHORITIES END--