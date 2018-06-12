package org.ps.camunda.java.api.gateway.auth.jwt;

import java.util.function.Function;

import org.ps.camunda.java.api.gateway.auth.LoginTokenDto;
import org.ps.camunda.java.api.gateway.auth.UserLoggedDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LoginTokenMapper {

	private final JwtTokenAccessFactory tokenFactory;

	@Autowired
	public LoginTokenMapper(final JwtTokenAccessFactory tokenFactory) {
		super();
		this.tokenFactory = tokenFactory;
	}

	public Function<UserLoggedDto, LoginTokenDto> map() {
		return this::build;
	}
	
	private LoginTokenDto build(final UserLoggedDto userLoggedDto) {
		final JwtToken accessToken = tokenFactory.createAccessJwtToken(userLoggedDto);
		final JwtToken refreshAccessToken = tokenFactory.createRefreshAccessJwtToken(userLoggedDto);

		return new LoginTokenDto(accessToken, refreshAccessToken);
	}
	
}
