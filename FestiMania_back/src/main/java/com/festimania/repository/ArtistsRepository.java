package com.festimania.repository;

import com.festimania.documentos.Artists;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArtistsRepository extends MongoRepository<Artists, String> {

}
