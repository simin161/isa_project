--INSERT INTO users values (1, 'address', 'city','country', 'mail@mail.com', 'First', true, false, 'Last', 'password', '12345678',0, '');
INSERT INTO loyalty_program values (1, 23.4, 'shark', 0,  40);
INSERT INTO location values (1, 'Forgotten town', 'Belgrade', 23.5, 44.5, '64', 4);
--USERS BEGIN--
INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (1, 'a', 'a', 'a', 'mail@mail.com', 'Papi', true, false, 'Papi', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 0, '');
INSERT INTO customer values (45,0, 1, 1);

INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (2, 'a', 'a', 'a', 'zokaMagic@mail.com', 'Zorica', true, false, 'Markovic', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 1, '');
INSERT INTO bungalow_owner values ('I just want to drink rakia with my comrades',0, 2, 1);

INSERT INTO public.users(
	id, address, city, country, email, first_name, is_activated, is_deleted, last_name, last_password_reset_date, number_of_log_ins, password, phone_number, user_type, verification_code)
	VALUES (3, 'a', 'a', 'a', 'vesnaVuki@mail.com', 'Vesna Vendi', true, false, 'Vukelic', '01-01-0001', 0, '$2a$10$S0qDDlMfhXUvj4bfwqtV9O2lEDkBPl1KEWl2MOtUtmSw9AdWO2VlG', '12345678', 3, '');
INSERT INTO instructor values ('This is healthy, and this is healthy ooooaaa','Hjaaaa hjaaaoooaaaaaa hjaaaa',0, 2, 1);
--USERS END--
--OFFERS BEGIN--
INSERT INTO public.offer(
  	id, additional_services, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(1, 'A lot of additional services _namyg_', 'No cancellation policies _namyg_', 'Very hot and sexy bungy', 0, 'Bungy wumby', 1, 5.0, 'Sex, drugs and alcohol', 10.5, 2, 1);
INSERT INTO bungalow values(1);
INSERT INTO public.offer(
  	id, additional_services, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(2, 'A lot of additional services _namyg_', 'No cancellation policies _namyg_', 'Very hot and sexy bungy', 1, 'Boaty wumby', 1, 5.0, 'Sex, drugs and alcohol', 10.5, 2, 1);
INSERT INTO bungalow values(2);
INSERT INTO public.offer(
  	id, additional_services, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, users, location)
    values(3, 'A lot of additional services _namyg_', 'No cancellation policies _namyg_', 'Very hot and sexy bungy', 2, 'Coursy wumby', 1, 5.0, 'Sex, drugs and alcohol', 10.5, 2, 1);
INSERT INTO course values('dildo', 3);
--OFFERS END--
--DELETE REQUEST BEGIN--
INSERT INTO public.delete_request(
	id, explanation, status, users)
	VALUES (1, 'I just want to die, thank you goodbye <3', 0, 1);
--DELETE REQUEST END--