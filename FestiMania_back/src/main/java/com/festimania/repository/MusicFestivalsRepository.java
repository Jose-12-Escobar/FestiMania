package com.festimania.repository;

import java.time.LocalDate;
import java.util.List;

import com.festimania.documentos.MusicFestivals;
import com.festimania.dto.ArtistDto;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface MusicFestivalsRepository extends MongoRepository<MusicFestivals, String> {
	List<MusicFestivals> findByArtistsIdContaining(String artistId);

	List<MusicFestivals> findByDateStartGreaterThanEqual(LocalDate currentDate);
}
