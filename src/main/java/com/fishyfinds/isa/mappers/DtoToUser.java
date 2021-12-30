package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.beans.users.customers.Customer;

import java.util.Map;

public class DtoToUser {

    public static Customer MapToCustomer(Map<String, String> map){
        return new Customer(map.get("firstName"), map.get("lastName"), map.get("address"),
                map.get("city"), map.get("country"), map.get("phoneNumber"), map.get("email"), map.get("password"));
    }

    public static User MapToUser(Map<String, String> map){
        return new User(Long.valueOf(map.get("id")),map.get("firstName"), map.get("lastName"), map.get("address"),
                map.get("city"), map.get("country"), map.get("phoneNumber"), map.get("email"), map.get("password"));
    }
}
