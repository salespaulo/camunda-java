package org.ps.camunda.java.lib.core.http;

import org.springframework.hateoas.VndErrors;
import org.springframework.http.ResponseEntity;

public class HttpRestClientException extends Exception {
	
	private static final long serialVersionUID = 1576835941657730713L;

	private final ResponseEntity<VndErrors> errors;

	public HttpRestClientException(ResponseEntity<VndErrors> errors) {
		super();
		this.errors = errors;
	}

	public ResponseEntity<VndErrors> getErrors() {
		return errors;
	}
	
}
