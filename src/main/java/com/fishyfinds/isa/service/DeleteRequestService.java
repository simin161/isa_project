package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.DeleteRequest;
import com.fishyfinds.isa.repository.DeleteRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeleteRequestService {

    @Autowired
    private DeleteRequestRepository deleteRequestRepository;

    public void add(DeleteRequest deleteRequest){
        deleteRequestRepository.save(deleteRequest);
    }
}
