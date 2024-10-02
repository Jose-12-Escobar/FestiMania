package com.festimania.bo.impl;

import java.util.List;

import com.festimania.bo.GenresBO;
import com.festimania.dto.GenresDto;
import com.festimania.mapper.GenresMapper;
import com.festimania.repository.GenresRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GenresBOImpl implements GenresBO {

	@Autowired
	GenresRepository genreRepository;
	
	@Autowired
	GenresMapper genreMapper;
	
	@Override
	public List<GenresDto> findAllGenres() {
		return genreRepository.findAll().stream().map(genreMapper::toDTO).toList();
	}

}
