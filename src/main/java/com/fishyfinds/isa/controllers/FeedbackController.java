package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.mappers.DtoToFeedback;
import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.FeedbackService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;
    @Autowired
    private TokenUtils tokenUtils;

    @PostMapping("/addFeedback")
    public boolean addFeedback(@RequestHeader("Authorization") HttpHeaders header,@RequestBody Map<String, String> params) {
        try {
            final String value =header.getFirst(HttpHeaders.AUTHORIZATION);
            final JSONObject obj = new JSONObject(value);
            String user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            return feedbackService.addFeedback(username, DtoToFeedback.MapToUserFeedback(params));

        }catch(Exception e){
        }
        return  false;
    }
}
