package com.fishyfinds.isa.dto;

import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.terms.Reservation;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
public class TermDTO {

    public Long id;
    public Offer offer;
    public LocalDateTime startTime;
    public LocalDateTime endTime;
    public List<Reservation> reservations;
    public String path;

}
