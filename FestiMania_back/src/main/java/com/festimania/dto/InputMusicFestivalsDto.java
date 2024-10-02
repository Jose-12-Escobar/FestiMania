package com.festimania.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InputMusicFestivalsDto {

	private String name;
	private LocationDTO location;
	private LocalDate dateStart;
	private LocalDate dateEnd;
	private List<String> genres;
	private TicketPriceDTO ticketPrice;
	private int capacity;

	// DTO for location
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class LocationDTO {
		private String city;
		private String state;
		private String country;

	}

	// DTO for ticketPrice
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class TicketPriceDTO {
		private double average;
		private String currency;

	}

}
