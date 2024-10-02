package com.festimania.bo.impl;

import java.util.List;

import com.festimania.bo.ArtistsBO;
import com.festimania.documentos.Artists;
import com.festimania.documentos.MusicFestivals;
import com.festimania.dto.ArtistDto;
import com.festimania.exceptions.ResourceNotFoundException;
import com.festimania.mapper.ArtistMapper;
import com.festimania.repository.ArtistsRepository;
import com.festimania.repository.MusicFestivalsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArtistBOImpl implements ArtistsBO {

	@Autowired
	ArtistsRepository artistRepository;

	@Autowired
	MusicFestivalsRepository festivalRepository;

	@Autowired
	ArtistMapper artistMapper;

	@Override
	@Transactional(readOnly = true)
	public List<ArtistDto> findAllArtists() {
		return artistRepository.findAll().stream().map(artistMapper::toDTO).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public ArtistDto findById(String id) {
		return artistRepository.findById(id).map(artistMapper::toDTO)
				.orElseThrow(() -> new ResourceNotFoundException("Artista con id " + id + " no encontrado"));
	}

	@Override
	@Transactional
	public ArtistDto saveArtist(ArtistDto artistDto) {
		Artists artist = artistMapper.toEntity(artistDto);
		artist = artistRepository.save(artist);
		return artistMapper.toDTO(artist);
	}

	@Override
	public ArtistDto updateArtist(String id, ArtistDto artistDto) {
		artistRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Artista con id " + id + " no existe"));
		Artists updateArtist = artistMapper.toEntity(artistDto);
		updateArtist.setId(id);
		updateArtist = artistRepository.save(updateArtist);
		return artistMapper.toDTO(updateArtist);
	}

	@Override
	public void deleteArtistById(String id) {
		artistRepository.deleteById(id);
		List<MusicFestivals> festivalsByArtist = festivalRepository.findByArtistsIdContaining(id);
		if (!festivalsByArtist.isEmpty()) {
			for (MusicFestivals festival : festivalsByArtist) {
				festival.getArtistsId().remove(id);
				festivalRepository.save(festival);
			}
		}

	}

	@Override
	public List<ArtistDto> getArtistsByIds(List<String> artistIds) {
		return artistRepository.findAllById(artistIds).stream().map(artistMapper::toDTO).toList();
	}

}
