package org.ps.camunda.java.api.gateway.auth;

import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;

import com.google.common.base.Preconditions;

public final class UserLoggedDto {

	private final String username;
	private List<GrantedAuthority> authorities = Collections.emptyList();

	public UserLoggedDto(final String username) {
		Preconditions.checkArgument(StringUtils.isNotBlank(username), "Username is empty.");
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public List<GrantedAuthority> getAuthorities() {
		return authorities;
	}

}