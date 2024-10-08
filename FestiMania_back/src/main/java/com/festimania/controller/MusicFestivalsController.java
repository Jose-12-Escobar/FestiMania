package com.festimania.controller;

import java.util.List;

import com.festimania.bo.GenresBO;
import com.festimania.bo.MusicFestivalsBO;
import com.festimania.dto.GenresDto;
import com.festimania.dto.MusicFestivalsDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/festivals")
@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
public class MusicFestivalsController {

	@Autowired
	private MusicFestivalsBO festivalsBO;
	
	@Autowired
	GenresBO genreBO;

	@GetMapping
	public ResponseEntity<List<MusicFestivalsDto>> getAllFestivals() {
		List<MusicFestivalsDto> listFestivalsDto = festivalsBO.findAllFestivals();
		return listFestivalsDto != null && !listFestivalsDto.isEmpty() ? ResponseEntity.ok(listFestivalsDto)
				: ResponseEntity.noContent().build();
	}
	
	@PreAuthorize("permitAll()")
	@GetMapping("/recent")
	public ResponseEntity<List<MusicFestivalsDto>> getFestivalsRecent() {
		List<MusicFestivalsDto> listFestivalsDto = festivalsBO.findFestivalsRecent();
		return listFestivalsDto != null && !listFestivalsDto.isEmpty() ? ResponseEntity.ok(listFestivalsDto)
				: ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<MusicFestivalsDto> getByIdFestivals(@PathVariable String id) {
		MusicFestivalsDto festivalDto = festivalsBO.findById(id);
		return festivalDto != null ? ResponseEntity.ok(festivalDto) : ResponseEntity.notFound().build();
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/genres")
	public ResponseEntity<List<GenresDto>> getAllGenres() {
		List<GenresDto> listGemresDto = genreBO.findAllGenres();
		return listGemresDto != null && !listGemresDto.isEmpty() ? ResponseEntity.ok(listGemresDto)
				: ResponseEntity.noContent().build();
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping
	public ResponseEntity<MusicFestivalsDto> save(@RequestBody MusicFestivalsDto festivalDto) {
		MusicFestivalsDto savedFestival = festivalsBO.saveFestival(festivalDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedFestival);
	}
	
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/{festivalId}/artist/{artistId}")
    public ResponseEntity<MusicFestivalsDto> addArtistToFestival(@PathVariable String festivalId, @PathVariable String artistId) {
		MusicFestivalsDto updatedFestival = festivalsBO.addArtist(festivalId, artistId);
        return ResponseEntity.ok(updatedFestival);
    }
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<MusicFestivalsDto> update(@PathVariable String id, @RequestBody MusicFestivalsDto festivalDTO) {
		MusicFestivalsDto updatedFestival = festivalsBO.updateFestival(id, festivalDTO);
		return ResponseEntity.ok(updatedFestival);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable String id) {
		festivalsBO.deleteFestivalById(id);
		return ResponseEntity.noContent().build();
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{festivalId}/artist/{artistId}")
    public ResponseEntity<MusicFestivalsDto> deleteArtistToFestival(@PathVariable String festivalId, @PathVariable String artistId) {
		MusicFestivalsDto updatedFestival = festivalsBO.deleteArtist(festivalId, artistId);
        return ResponseEntity.ok(updatedFestival);
    }
	
	
	
}
