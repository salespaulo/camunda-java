package org.ps.camunda.java.api.gateway.auth.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtSettings {

    @Value("${security.jwt.tokenSigningKey}")
    private String tokenSigningKey;

    @Value("${security.jwt.tokenIssuer}")
    private String tokenIssuer;

    @Value("${security.jwt.tokenExpirationTime}")
    private Long tokenExpirationTime;

    @Value("${security.jwt.refreshTokenExpTime}")
    private Long refreshTokenExpTime;
    
    public Long getTokenExpirationTime() {
		return tokenExpirationTime;
	}
    
    public Long getRefreshTokenExpTime() {
		return refreshTokenExpTime;
	}
    
    public String getTokenIssuer() {
		return tokenIssuer;
	}
    
    public String getTokenSigningKey() {
		return tokenSigningKey;
	}
    
}
