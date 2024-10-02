package com.festimania.bo.impl;

import java.time.LocalDate;
import java.util.List;

import com.festimania.bo.MusicFestivalsBO;
import com.festimania.documentos.MusicFestivals;
import com.festimania.dto.MusicFestivalsDto;
import com.festimania.exceptions.ResourceNotFoundException;
import com.festimania.mapper.MusicFestivalsMapper;
import com.festimania.repository.ArtistsRepository;
import com.festimania.repository.MusicFestivalsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MusicFestivalsBOImpl implements MusicFestivalsBO {

	@Autowired
	private MusicFestivalsRepository festivalsRepository;

	@Autowired
	private ArtistsRepository artistRepository;

	@Autowired
	private MusicFestivalsMapper festivalsMapper;
	
	@Autowired
	private ArtistBOImpl artistBOImpl;

	@Override
	@Transactional(readOnly = true)
	public List<MusicFestivalsDto> findAllFestivals() {
		return festivalsRepository.findAll().stream().map(festival -> festivalsMapper.toDTO(festival, artistBOImpl)).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public MusicFestivalsDto findById(String id) {
		return festivalsRepository.findById(id).map(festival -> festivalsMapper.toDTO(festival, artistBOImpl))
				.orElseThrow(() -> new ResourceNotFoundException("Festival con id " + id + " no encontrado"));
	}

	@Override
	@Transactional
	public MusicFestivalsDto saveFestival(MusicFestivalsDto festivalDto) {
		MusicFestivals festival = festivalsMapper.toEntity(festivalDto);
		festival = festivalsRepository.save(festival);
		return festivalsMapper.toDTO(festival, artistBOImpl);
	}

	@Override
	@Transactional
	public MusicFestivalsDto updateFestival(String id, MusicFestivalsDto festivalDto) {
		festivalsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Festival con id " + id + " no existe"));
		MusicFestivals festival = festivalsMapper.toEntity(festivalDto);
		festival.setId(id);
		festival = festivalsRepository.save(festival);
		return festivalsMapper.toDTO(festival, artistBOImpl);
	}

	@Override
	@Transactional
	public void deleteFestivalById(String id) {
		festivalsRepository.deleteById(id);

	}

	@Override
	public MusicFestivalsDto addArtist(String festivalId, String artistId) {
		MusicFestivals festival = festivalsRepository.findById(festivalId)
				.orElseThrow(() -> new ResourceNotFoundException("Festival no encontrado"));
		artistRepository.findById(artistId).orElseThrow(() -> new ResourceNotFoundException("Artista no encontrado"));

		if(festival.getArtistsId().contains(artistId)) 
			throw new ResourceNotFoundException("El artista " + artistId + " ya forma parte del festival " + festivalId);
		 
		festival.getArtistsId().add(artistId);
		
		return festivalsMapper.toDTO(festivalsRepository.save(festival), artistBOImpl);
	}

	@Override
	public MusicFestivalsDto deleteArtist(String festivalId, String artistId) {
		MusicFestivals festival = festivalsRepository.findById(festivalId)
				.orElseThrow(() -> new ResourceNotFoundException("Festival no encontrado"));
		
		if((festivalsRepository.findByArtistsIdContaining(artistId)).isEmpty()) 
			throw new ResourceNotFoundException("El artista " + artistId + " no forma parte del festival " + festivalId);
		else 
			festival.getArtistsId().remove(artistId);
			
		return festivalsMapper.toDTO(festivalsRepository.save(festival), artistBOImpl);
	}

	@Override
	public List<MusicFestivalsDto> findFestivalsRecent() {
		 LocalDate currentDate = LocalDate.now();
		 return festivalsRepository.findByDateStartGreaterThanEqual(currentDate).stream().map(festival -> festivalsMapper.toDTO(festival, artistBOImpl)).toList();
	}

}
