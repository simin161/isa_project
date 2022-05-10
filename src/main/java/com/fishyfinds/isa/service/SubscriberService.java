package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.Subscriber;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.repository.SubscriberRepository;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.usersRepository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SubscriberService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OfferRepository offerRepository;
    @Autowired
    private SubscriberRepository subscriberRepository;

    public void addSubscription(Map<String, String> message){
        Subscriber subscriber = new Subscriber();
        Customer follower = customerRepository.findByEmail(message.get("follower"));
        Offer following = offerRepository.findById(Integer.parseInt(message.get("following")));
        //TODO: check if pair already exists
        subscriber.setFollower(follower);
        subscriber.setFollowing(following);
        subscriberRepository.save(subscriber);

    }
}
