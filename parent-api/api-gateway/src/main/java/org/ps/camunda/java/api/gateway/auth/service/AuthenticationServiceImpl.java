package org.ps.camunda.java.api.gateway.auth.service;

import org.ps.camunda.java.api.gateway.auth.LoginTokenDto;
import org.ps.camunda.java.api.gateway.auth.jwt.LoginTokenMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
class AuthenticationServiceImpl implements  AuthenticationService {

	private final LoginTokenMapper loginTokenMapper;

	@Autowired
	public AuthenticationServiceImpl(final LoginTokenMapper loginTokenMapper) {
		this.loginTokenMapper = loginTokenMapper;
	}
	
	public LoginTokenDto login(final String username, final String password) {
		/*
		final User userToLogin = new User();
		userToLogin.setUsername(username);
		userToLogin.setPassword(password);

		final Optional<User> user = securityService.findUserByUsernameAndPassword(userToLogin);

		final LoginTokenDto loginToken = user
				.map(UserLoggedDto::new)
				.map(loginTokenMapper.map())
				.orElseThrow(newUserPasswordAuthError);
		
		final User rawUser = user.get();
		rawUser.setRefreshToken(loginToken.getRefreshToken().getToken());
		// TODO temos que diminuir hash gerado para refreshToken para gravar em uma colna na base 
		userService.save(rawUser);
		return loginToken;
		*/
		return null;
	}

}
