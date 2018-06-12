package org.ps.camunda.java.api.gateway.auth.exception;

import com.fasterxml.jackson.annotation.JsonValue;

enum ErrorCode {
	SERVER(1),
    GLOBAL(2),
    AUTHENTICATION(10), 
    JWT_TOKEN_EXPIRED(11);
    
    private Integer errorCode;

    private ErrorCode(final Integer errorCode) {
        this.errorCode = errorCode;
    }

    @JsonValue
    public Integer getErrorCode() {
        return errorCode;
    }
}