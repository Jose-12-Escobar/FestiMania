package com.festimania.bo;

import java.util.List;

import com.festimania.dto.MusicFestivalsDto;

public interface MusicFestivalsBO {

	List<MusicFestivalsDto> findAllFestivals();
	MusicFestivalsDto findById(String id);
	MusicFestivalsDto saveFestival(MusicFestivalsDto festivalDto);
	MusicFestivalsDto updateFestival(String id, MusicFestivalsDto festivalDto);
	void deleteFestivalById(String id);
	MusicFestivalsDto addArtist(String festivalId, String artistId);
	MusicFestivalsDto deleteArtist(String festivalId, String artistId);
	List<MusicFestivalsDto> findFestivalsRecent();
	
}
