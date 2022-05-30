package com.fishyfinds.isa.dto;

import javax.persistence.Column;
import java.time.LocalDateTime;

public class TermDto {
    public Long id;
    public LocalDateTime startTime;
    public LocalDateTime endTime;

    public TermDto(LocalDateTime startTime, LocalDateTime endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
