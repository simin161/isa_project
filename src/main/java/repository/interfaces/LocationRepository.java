package repository.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;

import model.beans.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {

}
