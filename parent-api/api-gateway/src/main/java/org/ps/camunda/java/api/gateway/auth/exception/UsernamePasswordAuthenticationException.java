package org.ps.camunda.java.api.gateway.auth.exception;

import org.springframework.security.core.AuthenticationException;

final class UsernamePasswordAuthenticationException extends AuthenticationException {

	private static final long serialVersionUID = -1453416027905539627L;

	public UsernamePasswordAuthenticationException() {
		super("Username or Password is invalid.");
	}
}
