package com.festimania.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArtistDto {

	private String id;
	private String name;
	private List<String> genres;
	private String nationality;
}
