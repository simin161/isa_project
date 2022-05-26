package com.fishyfinds.isa;

import com.fishyfinds.isa.service.PenalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@SpringBootApplication
@EnableScheduling
public class IsaApplication {
	public static void main(String[] args) {
		SpringApplication.run(IsaApplication.class, args);
	}
}
