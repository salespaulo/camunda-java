package org.ps.camunda.java.lib.core.api;

import java.net.URI;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.hateoas.VndErrors;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface BaseRestController {
	
	static final String V1_MEDIA_TYPE = "application/vnd.finchsolucoes.api.v1+json";
	static final String ERROR_MEDIA_TYPE = "application/vnd.error+json";

	URI createLocation(ApiResource resource);
	
	default ResponseEntity<ApiResource> createResponse(ApiResource resource) {
		return ResponseEntity.created(createLocation(resource)).body(resource);
	}
	
	public static ResponseEntity<VndErrors> handleError(Throwable exception, HttpStatus httpStatus, String logRef) {
		final String message = Optional.ofNullable(exception)
				.map(e -> e.getMessage())
				.filter(StringUtils::isNotBlank)
				.orElse(exception.getClass().getSimpleName());

		final HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_TYPE, ERROR_MEDIA_TYPE);

		return new ResponseEntity<>(new VndErrors(logRef, message), headers, httpStatus);
	}

}
