package model.beans;

import java.util.List;

public class Bungalow extends Offer{

	private List<Room> rooms;

	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
	}
	
}
