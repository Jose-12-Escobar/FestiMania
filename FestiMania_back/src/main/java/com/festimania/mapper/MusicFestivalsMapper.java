package com.festimania.mapper;

import java.util.List;

import com.festimania.bo.impl.ArtistBOImpl;
import com.festimania.documentos.MusicFestivals;
import com.festimania.dto.ArtistDto;
import com.festimania.dto.MusicFestivalsDto;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface MusicFestivalsMapper {
	
	@Mappings({
		@Mapping(source = "id", target = "id"),
		@Mapping(source = "name", target = "name"),
		@Mapping(source = "location", target = "location"),
		@Mapping(source = "dateStart", target = "dateStart"),
		@Mapping(source = "dateEnd", target = "dateEnd"),
		@Mapping(source = "genres", target = "genres"),
		@Mapping(source = "artistsId", target = "artists", qualifiedByName = "mapIdsToArtists"),
		@Mapping(source = "ticketPrice", target = "ticketPrice"),
		@Mapping(source = "capacity", target = "capacity")
})

	// Mapea de entidad a DTO
	MusicFestivalsDto toDTO(MusicFestivals festival, @Context ArtistBOImpl artistBoImpl);

	List<MusicFestivalsDto> toDTO(List<MusicFestivals> festivals, @Context ArtistBOImpl artistBoImpl);

	
	// Método para convertir de List<String> (IDs) a List<ArtistDto> (de Ids a objetos)
		@Named("mapIdsToArtists")
		default List<ArtistDto> mapIdsToArtists(List<String> artistsId, @Context ArtistBOImpl artistBoImpl) {
			if (artistsId == null) {
				return null;
			}
			// Utiliza artistBoImpl para obtener los artistas por sus IDs
			return artistBoImpl.getArtistsByIds(artistsId);
		}
		
		/*******************************************/
	
		@Mappings({
			@Mapping(source = "id", target = "id"),
			@Mapping(source = "name", target = "name"),
			@Mapping(source = "location", target = "location"),
			@Mapping(source = "dateStart", target = "dateStart"),
			@Mapping(source = "dateEnd", target = "dateEnd"),
			@Mapping(source = "genres", target = "genres"),
			@Mapping(source = "artists", target = "artistsId", qualifiedByName = "mapArtistsToIds"),
			@Mapping(source = "ticketPrice", target = "ticketPrice"),
			@Mapping(source = "capacity", target = "capacity")
	})	
		// Mapea de DTO a entidad
		MusicFestivals toEntity(MusicFestivalsDto festivalDTO);

		List<MusicFestivals> toEntity(List<MusicFestivalsDto> festivalsDTO);
		
		// Método inverso: convertir de List<ArtistDto> a List<String> (IDs)
		@Named("mapArtistsToIds")
		default List<String> mapArtistsToIds(List<ArtistDto> artists) {
			if (artists == null) {
				return null;
			}
			return artists.stream()
						  .map(ArtistDto::getId)
						  .toList();
		}
}
