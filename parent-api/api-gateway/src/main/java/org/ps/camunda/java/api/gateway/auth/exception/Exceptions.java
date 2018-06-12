package org.ps.camunda.java.api.gateway.auth.exception;

import java.io.Serializable;
import java.util.function.Supplier;

import org.ps.camunda.java.api.gateway.auth.jwt.JwtToken;
import org.springframework.security.authentication.BadCredentialsException;

import io.jsonwebtoken.ExpiredJwtException;

public final class Exceptions {
	
	private Exceptions() {
		throw new AssertionError();
	}

	public static Supplier<ResourceNotFoundException> supplierUserNotFound(final Serializable id) {
		return supplierResourceNotFound("User", id);
	}
	
	public static Supplier<ResourceNotFoundException> supplierResourceNotFound(final String name, final Serializable id) {
		return ResourceNotFoundException.supplier(name, id);
	}

	// Menos codigo nesse tipo de sintaxe
	public static final Supplier<JwtTokenMissingException> supplierJwtTokenMissing = () -> new JwtTokenMissingException();
	
	// Menos codigo nesse tipo de sintaxe
	public static final Supplier<UsernamePasswordAuthenticationException> newUserPasswordAuthError = () -> new UsernamePasswordAuthenticationException();

	public static BadCredentialsException newBadCredentials(final Throwable cause) {
		return new BadCredentialsException("Bad Credentials Authorization.", cause);
	}

	public static JwtTokenExpiredException newJwtTokenExpired(final JwtToken token, final ExpiredJwtException cause) {
		return new JwtTokenExpiredException(token, cause);
	}

	public static Supplier<JwtTokenInvalidException> newJwtInvalid(final JwtToken refreshToken) {
		return () -> new JwtTokenInvalidException(refreshToken);
	}
}
