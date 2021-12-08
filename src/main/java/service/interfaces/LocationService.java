package service.interfaces;

import java.util.List;

import model.beans.Location;

public interface LocationService {
	
	Location save(Location location);
	
	void delete(long id);
	
	Location findById(long id);
	
	List<Location> findAll();
	
	Location update(Location location) throws Exception;
}
