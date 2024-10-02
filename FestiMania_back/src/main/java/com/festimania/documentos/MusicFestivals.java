package com.festimania.documentos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "music_festivals")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MusicFestivals {

	@Id
	private String id;

	private String name;

	private Location location;

	private LocalDate dateStart;
	
	private LocalDate dateEnd;

	private List<String> genres;

	private List<String> artistsId;

	private TicketPrice ticketPrice;

	private int capacity;

	// Inner classes for nested objects
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Location {
		private String city;
		private String state;
		private String country;
	}


	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class TicketPrice {
		private double average;
		private String currency;

	}
}
