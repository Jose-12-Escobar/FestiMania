package com.festimania.controller;

import java.util.List;

import com.festimania.bo.ArtistsBO;
import com.festimania.dto.ArtistDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/artists")
public class ArtistsController {

	@Autowired
	ArtistsBO artistBO;
	
	@GetMapping
	public ResponseEntity<List<ArtistDto>> getAllArtists() {
		List<ArtistDto> listArtistsDto = artistBO.findAllArtists();
		return listArtistsDto != null && !listArtistsDto.isEmpty() ? ResponseEntity.ok(listArtistsDto)
				: ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ArtistDto> getByIdArtist(@PathVariable String id) {
		ArtistDto artistDto = artistBO.findById(id);
		return artistDto != null ? ResponseEntity.ok(artistDto) : ResponseEntity.notFound().build();
	}
	
	@PostMapping
	public ResponseEntity<ArtistDto> save(@RequestBody ArtistDto artistDto) {
		ArtistDto savedArtist = artistBO.saveArtist(artistDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedArtist);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ArtistDto> update(@PathVariable String id, @RequestBody ArtistDto artistDTO) {
		ArtistDto updateArtist = artistBO.updateArtist(id, artistDTO);
		return ResponseEntity.ok(updateArtist);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable String id) {
		artistBO.deleteArtistById(id);
		return ResponseEntity.noContent().build();
	}
	
}
