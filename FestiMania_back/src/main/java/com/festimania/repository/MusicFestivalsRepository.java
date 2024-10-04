package com.festimania.repository;

import java.time.LocalDate;
import java.util.List;

import com.festimania.documentos.MusicFestivals;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MusicFestivalsRepository extends MongoRepository<MusicFestivals, String> {
	List<MusicFestivals> findByArtistsIdContaining(String artistId);

	List<MusicFestivals> findByDateStartGreaterThanEqual(LocalDate currentDate);
}
