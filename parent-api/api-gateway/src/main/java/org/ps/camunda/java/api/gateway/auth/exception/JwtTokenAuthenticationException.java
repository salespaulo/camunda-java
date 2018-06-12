package org.ps.camunda.java.api.gateway.auth.exception;

import org.ps.camunda.java.api.gateway.auth.jwt.JwtToken;
import org.springframework.security.core.AuthenticationException;

class JwtTokenAuthenticationException extends AuthenticationException {

	private static final long serialVersionUID = 3018461054095289405L;

	private final JwtToken token;
	
	protected JwtTokenAuthenticationException(final JwtToken token, final String msg) {
		super(msg);
		this.token = token;
	}
	
	protected JwtTokenAuthenticationException(final JwtToken token, final String msg, final Throwable cause) {
		super(msg, cause);
		this.token = token;
	}
	
	public JwtToken getToken() {
		return token;
	}
	
}
