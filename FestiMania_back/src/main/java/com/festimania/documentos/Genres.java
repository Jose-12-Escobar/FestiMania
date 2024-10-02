package com.festimania.documentos;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "genres")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Genres {
	
	private String id;
	private String name;

}
