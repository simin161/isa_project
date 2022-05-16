package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.model.beans.Subscriber;
import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.SubscriberService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class SubscriberController {

    @Autowired
    private SubscriberService subscriberService;
    @Autowired
    private TokenUtils tokenUtils;

    @PostMapping("/addFollower")
    public void addSubscriber(@RequestHeader("Authorization") HttpHeaders header, @RequestBody Map<String, String> message) {
        try {
            final String value = header.getFirst(HttpHeaders.AUTHORIZATION);
            final JSONObject obj = new JSONObject(value);
            String user = null;
            user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            message.put("user", username);
            subscriberService.addSubscription(message);
        } catch (JSONException e) {
        }
    }

    @GetMapping("/getSubscriptionsByUser")
    public List<Subscriber> getSubscriptionsByUser(@RequestHeader("Authorization") HttpHeaders header){
        try {
            final String value = header.getFirst(HttpHeaders.AUTHORIZATION);
            final JSONObject obj = new JSONObject(value);
            String user = null;
            user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            return subscriberService.getSubscriptionsByUser(username);
        } catch (JSONException e) {
            return null;
        }
    }
}
