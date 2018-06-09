package org.ps.camunda.java.lib.core.http;

import static org.ps.camunda.java.lib.core.api.BaseRestController.ERROR_MEDIA_TYPE;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Objects;

import org.ps.camunda.java.lib.core.log.LogAspect;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.VndErrors;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class HttpRestClient {
	
	private static final Logger logger = LogAspect.logger.apply(HttpRestClient.class);

	private static final String APPLICATION_NAME = "HttpRestClient";
	
	private static final String EMPTY_BODY = "Empty Body";

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private ObjectMapper objectMapper;

	public HttpRestClient() {
		super();
		Objects.requireNonNull(this.restTemplate, "RestTemplate is required non null.");
		Objects.requireNonNull(this.objectMapper, "ObjectMapper is required non null.");
		
		this.restTemplate.setRequestFactory(
				new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
		
		this.restTemplate.getInterceptors().add(
				new HttpRestClientLoggerInterceptor());
	}

	public HttpRestClient(RestTemplate restTemplate, ObjectMapper objectMapper) {
		super();
		Objects.requireNonNull(restTemplate, "RestTemplate is required non null.");
		Objects.requireNonNull(objectMapper, "ObjectMapper is required non null.");

		this.restTemplate = restTemplate;
		this.objectMapper = objectMapper;

		this.restTemplate.setRequestFactory(
				new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
		
		this.restTemplate.getInterceptors().add(
				new HttpRestClientLoggerInterceptor());
	}

	public <T> ResponseEntity<T> post(String url, Object request, Class<T> responseType) throws HttpRestClientException {
		try {
			return restTemplate.postForEntity(url, request, responseType);
		} catch (HttpClientErrorException e) {
			throw new HttpRestClientException(toResponseEntity(logAndReturn(e)));

		} catch (HttpServerErrorException e) {
			throw new HttpRestClientException(toResponseEntity(logAndReturn(e)));
		}
	}

	public <T> ResponseEntity<T> get(String url, Class<T> responseType) throws HttpRestClientException {
		try {
			return restTemplate.getForEntity(url, responseType);
		} catch (HttpClientErrorException e) {
			throw new HttpRestClientException(toResponseEntity(logAndReturn(e)));

		} catch (HttpServerErrorException e) {
			throw new HttpRestClientException(toResponseEntity(logAndReturn(e)));
		}
	}

	private HttpStatusCodeException logAndReturn(HttpStatusCodeException e) {
		final HttpStatus status = e.getStatusCode();
		final HttpHeaders headers = e.getResponseHeaders();
		final String body = e.getResponseBodyAsString();
		final Throwable cause = e.getRootCause();
		final Throwable[] throwables = e.getSuppressed();
		
		logger.error("ApplicationName={} ERROR={} status={} headers={} body={} cause={} throwables={}", 
				APPLICATION_NAME,
				e.getMessage(),
				status, 
				headers,
				body,
				cause,
				Arrays.toString(throwables));

		return e;
	}

	private ResponseEntity<VndErrors> toResponseEntity(HttpStatusCodeException e) {
		try {
			final HttpStatus status = e.getStatusCode();
			final HttpHeaders headers = e.getResponseHeaders();
			final byte[] body = e.getResponseBodyAsByteArray();

			if (body.length > 0) {
				return error(e, status, headers, body);
			}
			
			return error(e, status, headers, null);
		} catch (IOException e1) {
			throw new HttpRestClientMapperException(e1);
		}
	}

	private ResponseEntity<VndErrors> error(HttpStatusCodeException e, final HttpStatus status, 
			final HttpHeaders headers, final byte[] body) throws IOException {

		if (headers.get(HttpHeaders.CONTENT_TYPE).contains(ERROR_MEDIA_TYPE)) {
			final VndErrors errors = objectMapper.readValue(body, VndErrors.class);
			return new ResponseEntity<>(errors, headers, status);
		}

		final String logref = status + " error=" + e.getMessage();
		final String message = body == null ? EMPTY_BODY: new String(body, StandardCharsets.UTF_8.name());

		return new ResponseEntity<>(new VndErrors(logref, message), headers, status);
	}

}
