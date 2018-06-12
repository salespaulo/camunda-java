package org.ps.camunda.java.api.gateway.auth.exception;

import org.ps.camunda.java.api.gateway.auth.jwt.JwtToken;

import io.jsonwebtoken.ExpiredJwtException;

final class JwtTokenExpiredException extends JwtTokenAuthenticationException {

    private static final String JWT_TOKEN_EXPIRED = "JWT Token expired";

	private static final long serialVersionUID = -5959543783324224864L;
    
    public JwtTokenExpiredException(final JwtToken token, final ExpiredJwtException cause) {
        super(token, JWT_TOKEN_EXPIRED, cause);
    }

}