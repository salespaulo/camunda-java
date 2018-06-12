package org.ps.camunda.java.api.gateway.auth.exception;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
class APIExceptionHandler extends ResponseEntityExceptionHandler {
	
	private static final Logger log = LoggerFactory.getLogger(APIExceptionHandler.class);
	
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ExceptionHandler( {  
		JwtTokenExpiredException.class, 
		JwtTokenInvalidException.class, 
		JwtTokenMissingException.class, 
		UsernamePasswordAuthenticationException.class 
		})
	public ErrorResponse unauthorized(final HttpServletRequest request, final Exception exception) {
		logger("Unauthorized error: {}", exception);
		return ErrorResponse.of(exception.getMessage(), ErrorCode.GLOBAL, HttpStatus.UNAUTHORIZED);
	}
	
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler( {  
		ResourceNotFoundException.class
		})
	public ErrorResponse badRequest(final HttpServletRequest request, final Exception exception) {
		logger("Not found error: {}", exception);
		return ErrorResponse.of(exception.getMessage(), ErrorCode.GLOBAL, HttpStatus.NOT_FOUND);
	}
	
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Exception.class)
	public ErrorResponse exception(final HttpServletRequest request, final Exception exception) {
		logger("Internal server error: {}", exception);
		return ErrorResponse.of(exception.getMessage(), ErrorCode.SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private void logger(final String msg, final Exception exception) {
		log.error(msg, exception.getMessage(), exception);
	}

}
