package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.controllers.usersController.UserController;
import com.fishyfinds.isa.mappers.DtoToAccountDeletionRequest;
import com.fishyfinds.isa.mappers.DtoToResolveDeleteRequest;
import com.fishyfinds.isa.model.beans.AccountDeletionRequest;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.AccountDeletionRequestService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class AccountDeletionRequestController {

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private AccountDeletionRequestService accountDeletionRequestService;

    @PostMapping("/sendAccountDeletionRequest")
    public boolean add(@RequestHeader("Authorization") HttpHeaders headers, @RequestBody Map<String, String> message){
        final String value =headers.getFirst(HttpHeaders.AUTHORIZATION);
        try {
            final JSONObject obj = new JSONObject(value);
            String user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            return accountDeletionRequestService.add(username,DtoToAccountDeletionRequest.MapToDeleteRequest(message));
        }catch(Exception e){
            return false;
        }
    }

    @GetMapping("/allPendingDeletionRequests")
    public List<AccountDeletionRequest> findAllPending() {
        return accountDeletionRequestService.findAllPending();
    }

    @PostMapping("/approveDeleteRequest")
    public boolean approveDeleteRequest(@RequestBody Map<String, String> message){

        try {
            UserController userController = new UserController();
            boolean userReturn = userController.deleteUser(DtoToResolveDeleteRequest.MapToResolveRequest(message).getUser().getId());

            if(userReturn){

                return accountDeletionRequestService.updateRequest(DtoToResolveDeleteRequest.MapToResolveRequest(message).getRequestId());

            }
            else{
                return false;
            }

        }catch(Exception e){
            return false;
        }
    }

}
