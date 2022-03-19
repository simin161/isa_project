package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.model.beans.Complaint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping("/addComplaint")
    public boolean addComplaint(@RequestBody Map<String, String> message){
        return complaintService.add(new Complaint(message.get("content"), message.get("userID"), message.get("offerID")));
    }
}
