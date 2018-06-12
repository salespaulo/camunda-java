package org.ps.camunda.java.api.gateway.auth.exception;

import org.ps.camunda.java.api.gateway.auth.jwt.JwtToken;

final class JwtTokenInvalidException extends JwtTokenAuthenticationException {

	private static final String JWT_TOKEN_INVALID = "Jwt Token Invalid.";

	private static final long serialVersionUID = -294671188037098603L;

    public JwtTokenInvalidException(final JwtToken token) {
		super(token, JWT_TOKEN_INVALID);
	}
    
}