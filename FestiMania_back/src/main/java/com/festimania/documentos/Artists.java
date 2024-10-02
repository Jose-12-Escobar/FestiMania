package com.festimania.documentos;

import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "artists")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Artists {

	private String id;
	private String name;
	private List<String> genres;
	private String nationality;

}
