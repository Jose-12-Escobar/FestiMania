package com.festimania.mapper;

import com.festimania.documentos.Genres;
import com.festimania.dto.GenresDto;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GenresMapper {

	 GenresDto toDTO(Genres genre);
	 Genres toEntity(GenresDto genresDTO);
}
