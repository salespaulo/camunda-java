package org.ps.camunda.java.api.gateway.auth.jwt;

public interface TokenExtractor {

	String extract(final String header);

}
