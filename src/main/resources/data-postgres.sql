INSERT INTO users values (1, 'address', 'city','country', 'mail@mail.com', 'First', true, false, 'Last', 'password', '12345678',0, '');
INSERT INTO loyalty_program values (1, 23.4, 'shark', 0,  40);
INSERT INTO customer values (45,0, 1, 1);

INSERT INTO users values (2, 'address', 'city','country', 'jb', 'James', true, false, 'Bond', 'jb', '12345678',1, '');
INSERT INTO bungalow_owner values ('reason',1, 2, 1);

INSERT INTO loyalty_program values(3, 20.5, 'baby shark', 0, 0);
INSERT INTO users values (3, 'address', 'city','country', 'instructor@i.com', 'Instructor', true, false, 'I', 'in', '12345673',1, '');
INSERT INTO public.instructor(
	biography, reasoning, registration_status, id, loyalty_program)
	VALUES ('biography', 'reasoning', 1, 3, 3);
INSERT INTO location values (1, 'a', 'aa', 34.5, 23.4, 'aa', 4);
INSERT INTO offer values(1, 'a', 'a', 'a', 3, 'Bungalow1', 1, 3.4, 'a', 100.5, 0, 1);
INSERT INTO bungalow values(1);

INSERT INTO engine values (1, 230.0, 4, 3500);
INSERT INTO location values (2, 'location', 'loc', 23.5, 44.5, 'isda', 4);
INSERT INTO offer values(2, 'a', 'a', 'a', 3, 'TBoat1', 1, 4.5, 'a', 120.5, 0, 2);
INSERT INTO boat values(10, 'boat', '', '', 2,1);

INSERT INTO engine values (2, 230.0, 4, 3500);
INSERT INTO location values (3, 'location2', 'loc2', 23.5, 44.5, 'ulica0', 3);
INSERT INTO offer values(3, 'a', 'a', 'a', 3, 'Boat2', 2, 3.5, 'a', 100.5, 0, 3);
INSERT INTO boat values(10, 'boat', '', '', 3,2);

INSERT INTO public.location VALUES (4, 'Beograd', 'Ceca', 2, 1, 'Zabranjenog grada', 8);

INSERT INTO public.offer(
	id, additional_services, cancellation_policy, description, max_customer_capacity, offer_name, offer_type, rating, rules_of_conduct, unit_price, userid, location)
	VALUES (4, 'blabla', 'blaaa', 'desc desc desc', 3, 'name offer', 0, 3.5, 'ponasanja pravila', 450, 1, 4);

INSERT INTO public.bungalow values (4);