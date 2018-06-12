package org.ps.camunda.java.api.gateway.auth;

import org.ps.camunda.java.api.gateway.auth.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

	public static final String TOKEN_PROTECTED_ENDPOINTS = "/**";

	public static final String LOGIN_PATH_ENDPOINT = "/auth/login";
	public static final String REFRESH_PATH_ENDPOINT = "/auth/token";

	
	@Autowired
	private AuthenticationService authenticationService;

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public @ResponseBody LoginTokenDto login(@RequestHeader("username") final String username, @RequestHeader("password") final String password) {
		return authenticationService.login(username, password);
    }

}