package com.fishyfinds.isa.controllers.termsController;

import com.fishyfinds.isa.dto.TermDTO;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.AuthenticationService;
import com.fishyfinds.isa.service.offersService.OfferService;
import com.fishyfinds.isa.service.termsService.TermService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class TermController {

    @Autowired
    private TermService termService;
    @Autowired
    private OfferService offerService;
    @Autowired
    private TokenUtils tokenUtils;
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/filterAvailableTerms")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public List<TermDTO> filterAvailableTerms(@RequestBody Map<String, String> message){
        return termService.filterAvailableTerms(message);
    }

    @GetMapping("/getTermsByOfferId/{offerId}")
    public List<TermDTO> getTermsByOfferId(@PathVariable Long offerId) {
        return termService.getTermsByOfferId(offerId);
    }

    @PostMapping("/addNewTermToOffer/{offerId}")
    public boolean addNewTermToOffer(@RequestHeader("Authorization") HttpHeaders headers,
                                     @PathVariable Long offerId,
                                     @RequestBody TermDTO termDTO){
        try {
            final String value = headers.getFirst(HttpHeaders.AUTHORIZATION);
            final JSONObject obj = new JSONObject(value);
            String user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            Offer offer = offerService.findOfferByOfferId(offerId);
            return termService.addNewTermToOffer(termDTO, offer);
        }catch(Exception e){
            e.printStackTrace();
        }
        return  false;
    }













}
