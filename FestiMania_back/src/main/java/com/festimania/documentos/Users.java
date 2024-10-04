package com.festimania.documentos;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users  implements Serializable, UserDetails{

	private static final long serialVersionUID = -3462393998743355766L;
	
	private String userName;
	private String roles;
	private String password;
	private String name;
	private String lastName;
	private String email;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
	    return Arrays.stream(getRoles().split(","))
	    		.map(role -> new SimpleGrantedAuthority(role))
	    		.collect(Collectors.toSet());	
	}
	
	@Override
	public String getUsername() {
		return this.userName;
	}
}
