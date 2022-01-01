package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.mappers.DtoToDeleteRequest;
import com.fishyfinds.isa.service.DeleteRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class DeleteRequestController {

    @Autowired
    private DeleteRequestService deleteRequestService;

    @PostMapping("/addDeleteRequest")
    public void add(@RequestBody Map<String, String> message){
        deleteRequestService.add(DtoToDeleteRequest.MapToDeleteRequest(message));
    }

}
