package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.beans.Location;
import service.interfaces.LocationService;

@RestController
public class LocationController {
	@Autowired
	private LocationService locationService;
	
	@GetMapping(value = "nesto")
	public void getProducts() {
		locationService.save(new Location());
		System.out.println("ASDMAPSDMAPOSD");
	}
}
