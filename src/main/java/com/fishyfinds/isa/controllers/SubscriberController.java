package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.service.SubscriberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class SubscriberController {

    @Autowired
    private SubscriberService subscriberService;

    public void addSubscriber(@RequestBody Map<String, String> message){
        subscriberService.addSubscription(message);
    }
}
