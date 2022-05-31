package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class ImageItemController {

    @Autowired
    private ImageService imageService;

    @GetMapping("/getImage/{name}")
    public byte[] getImage(@PathVariable String name){
        return imageService.getImage(name);
    }



}
