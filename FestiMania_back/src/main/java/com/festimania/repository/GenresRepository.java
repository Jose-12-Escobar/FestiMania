package com.festimania.repository;

import com.festimania.documentos.Genres;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GenresRepository extends MongoRepository<Genres, String> {

}
