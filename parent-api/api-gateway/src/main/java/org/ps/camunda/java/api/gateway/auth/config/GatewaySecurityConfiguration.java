package org.ps.camunda.java.api.gateway.auth.config;

import static org.ps.camunda.java.api.gateway.auth.AuthenticationController.LOGIN_PATH_ENDPOINT;
import static org.ps.camunda.java.api.gateway.auth.AuthenticationController.REFRESH_PATH_ENDPOINT;
import static org.ps.camunda.java.api.gateway.auth.AuthenticationController.TOKEN_PROTECTED_ENDPOINTS;

import org.ps.camunda.java.api.gateway.auth.RestAuthenticationEntryPoint;
import org.ps.camunda.java.api.gateway.auth.SecurityRequestMatcher;
import org.ps.camunda.java.api.gateway.auth.exception.RestAuthenticationFailureHandler;
import org.ps.camunda.java.api.gateway.auth.jwt.JwtAuthenticationProvider;
import org.ps.camunda.java.api.gateway.auth.jwt.JwtTokenAuthenticationProcessingFilter;
import org.ps.camunda.java.api.gateway.auth.jwt.TokenExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class GatewaySecurityConfiguration extends WebSecurityConfigurerAdapter {

	public static final String AUTHORIZATION_HEADER = "Authorization";

	final SecurityRequestMatcher matcher = new SecurityRequestMatcher(
			TOKEN_PROTECTED_ENDPOINTS,
			LOGIN_PATH_ENDPOINT,
			REFRESH_PATH_ENDPOINT);

	@Autowired
	private JwtAuthenticationProvider jwtAuthenticationProvider;

	@Autowired
	private RestAuthenticationEntryPoint authenticationEntryPoint;

	@Autowired
	private RestAuthenticationFailureHandler failureHandler;

	@Autowired
	private TokenExtractor tokenExtractor;

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("OPTIONS");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("DELETE");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	protected JwtTokenAuthenticationProcessingFilter buildJwtTokenAuthFilter() throws Exception {
		final JwtTokenAuthenticationProcessingFilter filter = new JwtTokenAuthenticationProcessingFilter(matcher,
				tokenExtractor, failureHandler);

		filter.setAuthenticationManager(authenticationManagerBean());

		return filter;

	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) {
		auth.authenticationProvider(jwtAuthenticationProvider);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http //
				.cors() //
				.and() //
				.csrf() //
				.disable() //
				.exceptionHandling() //
				.authenticationEntryPoint(this.authenticationEntryPoint) //
				.and() //
				.authorizeRequests() //
				.antMatchers(LOGIN_PATH_ENDPOINT, REFRESH_PATH_ENDPOINT) //
				.permitAll() //
				.and() //
				.authorizeRequests() //
				.antMatchers(TOKEN_PROTECTED_ENDPOINTS) //
				.authenticated() //
				.and() //
				.addFilterBefore(buildJwtTokenAuthFilter(), UsernamePasswordAuthenticationFilter.class);
	}

}
