package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.mappers.DtoToAccountDeletionRequest;
import com.fishyfinds.isa.model.beans.AccountDeletionRequest;
import com.fishyfinds.isa.service.AccountDeletionRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class AccountDeletionRequestController {

    @Autowired
    private AccountDeletionRequestService accountDeletionRequestService;

    @PostMapping("/sendAccountDeletionRequest")
    public void add(@RequestBody Map<String, String> message){
        accountDeletionRequestService.add(DtoToAccountDeletionRequest.MapToDeleteRequest(message));
    }

    @GetMapping("/allDeletionRequests")
    public List<AccountDeletionRequest> findAll() {
        return accountDeletionRequestService.findAll();
    }

}
