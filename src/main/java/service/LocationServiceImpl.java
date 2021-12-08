package service;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import model.beans.Location;
import repository.interfaces.LocationRepository;
import service.interfaces.LocationService;

@Service
@Transactional
public class LocationServiceImpl implements LocationService{

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private LocationRepository locationRepository;
	@Override
	public Location save(Location location) {
		logger.info("> create");
		Location savedLocation = locationRepository.save(location);
		logger.info("< create");
		return savedLocation;
	}

	@Override
	public void delete(long id) {
		// TODO Auto-generated method stub
		logger.info("> delete");
		locationRepository.deleteById(id);
		logger.info("< delete");
	}

	@Override
	public Location findById(long id) {
		logger.info("> findById id:{}", id);
		Location location = locationRepository.findById(id).get();
		logger.info("< findById id:{}", id);
		return location;
	}

	@Override
	public List<Location> findAll() {
		logger.info("> findAll");
		List<Location> locations = locationRepository.findAll();
		logger.info("< findAll");
		return locations;
	}

	@Override
	public Location update(Location location) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
