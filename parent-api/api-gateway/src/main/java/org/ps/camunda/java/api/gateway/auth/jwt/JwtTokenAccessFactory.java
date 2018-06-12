package org.ps.camunda.java.api.gateway.auth.jwt;

import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.ps.camunda.java.api.gateway.auth.UserLoggedDto;
import org.ps.camunda.java.api.gateway.auth.jwt.RefreshAccessJwtToken.Privilege;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenAccessFactory {

	public static final String CLAIMS_PRIVILEGES = "privileges";

	private static final String ROLE_REFRESH_TOKEN = "ROLE_REFRESH_TOKEN";

	private final Map<Class<? extends JwtTokenRaw>, BiFunction<JwtToken, String, Optional<JwtToken>>> action = action();
	private final Map<Boolean, Function<Jws<Claims>, JwtToken>> actionInRefreshScopes = actionInRefreshScopes();

	private final JwtSettings settings;

	@Autowired
	public JwtTokenAccessFactory(final JwtSettings settings) {
		this.settings = settings;
	}

	public JwtToken createAccessJwtToken(final UserLoggedDto userLoggedDto) {
		// Preconditions.checkArgument(StringUtils.isNotBlank(userLoggedIn.getUsername()),
		// "Cannot create JWT Token without username");
		// Preconditions.checkArgument(notEmptyAuthorities(userLoggedIn), "User doesn't
		// have any privileges");

		final String tokenSigningKey = settings.getTokenSigningKey();
		final String tokenIssuer = settings.getTokenIssuer();
		final Long tokenExpiration = getTokenTimeout();

		final ZonedDateTime currentTime = ZonedDateTime.now();
		final Date issueAt = Date.from(currentTime.toInstant());
		final Date expiration = Date.from(currentTime.plusMinutes(tokenExpiration).toInstant());

		final Claims claims = Jwts.claims().setSubject(userLoggedDto.getUsername());

		claims.put(CLAIMS_PRIVILEGES, getPrivileges(userLoggedDto));

		String token = Jwts.builder().setClaims(claims).setIssuer(tokenIssuer).setIssuedAt(issueAt)
				.setExpiration(expiration).signWith(SignatureAlgorithm.HS512, tokenSigningKey).compact();

		return new JwtTokenAccess(token, claims);
	}

	public JwtToken createRefreshAccessJwtToken(final UserLoggedDto userLoggedDto) {

		if (StringUtils.isBlank(userLoggedDto.getUsername())) {
			throw new IllegalArgumentException("Cannot create JWT Token without username");
		}

		final String tokenSigningKey = settings.getTokenSigningKey();
		final String tokenIssuer = settings.getTokenIssuer();
		final Long tokenExpiration = getTokenRefreshTimeout();

		final ZonedDateTime currentTime = ZonedDateTime.now();
		final Date issueAt = Date.from(currentTime.toInstant());
		final Date expiration = Date.from(currentTime.plusMinutes(tokenExpiration).toInstant());

		final Claims claims = Jwts.claims().setSubject(userLoggedDto.getUsername());
		claims.put(CLAIMS_PRIVILEGES, Arrays.asList(ROLE_REFRESH_TOKEN));

		String token = Jwts.builder().setClaims(claims).setIssuer(tokenIssuer).setId(UUID.randomUUID().toString())
				.setIssuedAt(issueAt).setExpiration(expiration).signWith(SignatureAlgorithm.HS512, tokenSigningKey)
				.compact();

		return new JwtTokenAccess(token, claims);
	}

	public Optional<JwtToken> createRefreshAccessJwtToken(final JwtToken token, final String signingKey) {
		return Optional.ofNullable(action.get(token.getClass())).orElse((a, b) -> Optional.empty()).apply(token,
				signingKey);
	}

	public JwtToken createRawJwtToken(final String token) {
		return new JwtTokenRaw(token);
	}

	private boolean inRefreshScopes(final List<String> scopes) {
		return scopes.contains(Privilege.ROLE_REFRESH_TOKEN.toString());
	}

	private List<String> getPrivileges(final UserLoggedDto userLoggedDto) {
		return userLoggedDto.getAuthorities().stream().map(GrantedAuthority::toString).collect(Collectors.toList());
	}

	private Long getTokenTimeout() {
		return settings.getTokenExpirationTime();
	}

	private Long getTokenRefreshTimeout() {
		return settings.getRefreshTokenExpTime();
	}

	private Map<Class<? extends JwtTokenRaw>, BiFunction<JwtToken, String, Optional<JwtToken>>> action() {
		final Map<Class<? extends JwtTokenRaw>, BiFunction<JwtToken, String, Optional<JwtToken>>> action = Collections
				.synchronizedMap(new HashMap<>());

		action.put(JwtTokenRaw.class, (token, signingKey) -> {

			final JwtTokenRaw rawToken = (JwtTokenRaw) token;
			final Jws<Claims> claims = rawToken.parse(signingKey);

			@SuppressWarnings("unchecked")
			final List<String> privileges = claims.getBody().get("privileges", List.class);

			return inRefreshScopesAndCreateRefreshAccessJwtToken(privileges, claims);
		});

		return action;
	}

	private Optional<JwtToken> inRefreshScopesAndCreateRefreshAccessJwtToken(final List<String> privileges,
			final Jws<Claims> claims) {
		return Optional.ofNullable(actionInRefreshScopes
				.get(!inRefreshScopes(Optional.ofNullable(privileges).orElse(Collections.emptyList()))).apply(claims));
	}

	private Map<Boolean, Function<Jws<Claims>, JwtToken>> actionInRefreshScopes() {
		final Map<Boolean, Function<Jws<Claims>, JwtToken>> actionInRefreshScopes = Collections
				.synchronizedMap(new HashMap<>());
		actionInRefreshScopes.put(Boolean.TRUE, (claims) -> new RefreshAccessJwtToken(claims));
		actionInRefreshScopes.put(Boolean.FALSE, (claims) -> null);
		return actionInRefreshScopes;
	}
}