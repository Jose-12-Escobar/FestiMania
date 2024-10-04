package com.festimania.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.festimania.documentos.Users;

public interface UsersRepository extends MongoRepository<Users, String> {
	
	Optional<Users> findByUserNameOrEmail(String username, String email);
	Boolean existsByRoles(String rol);
	Boolean existsByUserNameOrEmail(String username, String email);

}
