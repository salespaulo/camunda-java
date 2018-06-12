package org.ps.camunda.java.api.gateway.auth.service;

import org.ps.camunda.java.api.gateway.auth.LoginTokenDto;

public interface AuthenticationService {
	
	LoginTokenDto login(final String username, final String password);

}
