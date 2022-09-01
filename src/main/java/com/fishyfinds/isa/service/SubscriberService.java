package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.Subscriber;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.ReservationStatus;
import com.fishyfinds.isa.repository.SubscriberRepository;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.usersRepository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
        Customer follower = customerRepository.findByEmail(message.get("user"));
        Offer following = offerRepository.findById(Long.parseLong(message.get("id"))).orElseGet(null);
        List<Subscriber> subByUser = subscriberRepository.findAllByFollower(follower);
        List<Subscriber> subByOff = subscriberRepository.findAllByFollowing(following);

        if( !subByUser.isEmpty() &&  !subByOff.isEmpty()){
            for(Subscriber s1 : subByUser){
                for(Subscriber s2 : subByOff){
                    if(s1.equals(s2)){
                        subscriber = s1;
                        subscriber.setRelevant(!subscriber.isRelevant());
                        break;
                    }
                }
            }
        }
        else {
            addNew(subscriber, follower, following);
        }

        subscriberRepository.save(subscriber);

    }

    private void addNew(Subscriber subscriber, Customer follower,Offer following){
        subscriber.setFollower(follower);
        subscriber.setFollowing(following);
        subscriber.setRelevant(true);
    }

    public List<Subscriber> getSubscriptionsByUser(String username) {
        Customer user = customerRepository.findByEmail(username);
        List<Subscriber> retVal = new ArrayList<>();
        for(Subscriber s : subscriberRepository.findAllByFollower(user)){
            if(s.isRelevant()){
                retVal.add(s);
            }
        }
        return retVal;
    }

    public List<String> getSubscribersByOffer(Offer offer){
        List<String> retVal = new ArrayList<>();
        for(Subscriber s : subscriberRepository.findAllByFollowing(offer)){
            if(s.isRelevant())
                retVal.add(s.getFollower().getEmail());
        }
        return retVal;
    }
}
