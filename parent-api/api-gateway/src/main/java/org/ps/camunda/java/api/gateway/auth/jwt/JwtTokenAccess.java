package org.ps.camunda.java.api.gateway.auth.jwt;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.jsonwebtoken.Claims;

final class JwtTokenAccess implements JwtToken {

	private final String rawToken;

	@JsonIgnore
	private final Claims claims;

	protected JwtTokenAccess(final String token, final Claims claims) {
		this.rawToken = token;
		this.claims = claims;
	}

	public String getToken() {
		return this.rawToken;
	}

	public Claims getClaims() {
		return this.claims;
	}
}