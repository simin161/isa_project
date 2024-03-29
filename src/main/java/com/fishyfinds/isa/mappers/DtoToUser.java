package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.model.beans.users.Admin;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.beans.users.instructors.Instructor;
import com.fishyfinds.isa.model.beans.users.owners.BoatOwner;
import com.fishyfinds.isa.model.beans.users.owners.BungalowOwner;
import com.fishyfinds.isa.model.enums.RegistrationStatus;

import java.util.Map;

public class DtoToUser {

    public static User MapToUser(Map<String, String> map) {
        return new User(Long.valueOf(map.get("id")), map.get("firstName"), map.get("lastName"), map.get("address"),
                map.get("city"), map.get("country"), map.get("phoneNumber"), map.get("email"), map.get("password"));
    }

    public static Customer MapToCustomer(Map<String, String> map) {
        return new Customer(map.get("firstName"), map.get("lastName"), map.get("address"),
                map.get("city"), map.get("country"), map.get("phoneNumber"), map.get("email"), map.get("password"));
    }

    public static BoatOwner MapToBoatOwner(Map<String, String> map) {
        return new BoatOwner(map.get("firstName"), map.get("lastName"), map.get("address"),
                map.get("city"), map.get("country"), map.get("phoneNumber"), map.get("email"), map.get("password"), map.get("reasoning"));
    }

    public static BungalowOwner MapToBungalowOwner(Map<String, String> map) {
        return new BungalowOwner(map.get("firstName"), map.get("lastName"), map.get("address"),
                map.get("city"), map.get("country"), map.get("phoneNumber"), map.get("email"), map.get("password"), map.get("reasoning"));
    }

    public static Instructor MapToInstructor(Map<String, String> map) {
        return new Instructor(map.get("firstName"), map.get("lastName"), map.get("address"),
                map.get("city"), map.get("country"), map.get("phoneNumber"), map.get("email"), map.get("password"), map.get("reasoning"));
    }

    public static Admin MapToAdmin(Map<String, String> map) {
        return new Admin(map.get("firstName"), map.get("lastName"), map.get("address"),
                map.get("city"), map.get("country"), map.get("phoneNumber"), map.get("email"), map.get("password"));
    }
}
