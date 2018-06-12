package org.ps.camunda.java.api.gateway.auth;

import org.ps.camunda.java.api.gateway.auth.jwt.JwtToken;

public final class LoginTokenDto {

	private JwtToken accessToken;
	
	private JwtToken refreshToken;
	
	public LoginTokenDto(final JwtToken accessToken, final JwtToken refreshToken) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}

	public JwtToken getAccessToken() {
		return accessToken;
	}
	
	public JwtToken getRefreshToken() {
		return refreshToken;
	}

}
