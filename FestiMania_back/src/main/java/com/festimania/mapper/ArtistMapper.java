package com.festimania.mapper;

import java.util.List;

import com.festimania.documentos.Artists;
import com.festimania.dto.ArtistDto;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ArtistMapper {

	  // Mapea de entidad a DTO
    ArtistDto toDTO(Artists artist);
    List<ArtistDto> toDTO(List<Artists> artists);

    // Mapea de DTO a entidad
    Artists toEntity(ArtistDto artistDTO);
    List<Artists> toEntity(List<ArtistDto> artistsDTO);
    
}
