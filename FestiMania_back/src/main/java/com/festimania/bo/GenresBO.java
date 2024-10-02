package com.festimania.bo;

import java.util.List;

import com.festimania.dto.GenresDto;

public interface GenresBO {

	List<GenresDto> findAllGenres();
	
}
