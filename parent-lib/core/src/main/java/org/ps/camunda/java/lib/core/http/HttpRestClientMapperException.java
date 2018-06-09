package org.ps.camunda.java.lib.core.http;

public class HttpRestClientMapperException extends RuntimeException {
	
	private static final long serialVersionUID = -2553912653386985018L;

	private static final String MESSAGE = "Http Rest Client Mapper error=%s";
	
	public HttpRestClientMapperException(Exception cause) {
		super(String.format(MESSAGE, cause.getMessage()), cause);
	}

}
