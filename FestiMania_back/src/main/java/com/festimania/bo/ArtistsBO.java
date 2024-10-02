package com.festimania.bo;

import java.util.List;

import com.festimania.dto.ArtistDto;

public interface ArtistsBO {

	List<ArtistDto> findAllArtists();
	ArtistDto findById(String id);
	ArtistDto saveArtist(ArtistDto artistDto);
	ArtistDto updateArtist(String id, ArtistDto artistDto);
	void deleteArtistById(String id);
	List<ArtistDto> getArtistsByIds(List<String> artistIds);
	
}
