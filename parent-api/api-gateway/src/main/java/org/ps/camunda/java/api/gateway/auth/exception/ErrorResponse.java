package org.ps.camunda.java.api.gateway.auth.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

class ErrorResponse {

    private final HttpStatus status;

    private final ErrorCode code;

    private final String message;

    private final LocalDateTime timestamp;

    protected ErrorResponse(final String message, final ErrorCode code, final HttpStatus status) {
        this.message = message;
        this.code = code;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }

    public static ErrorResponse of(final String message, final ErrorCode errorCode, final HttpStatus status) {
        return new ErrorResponse(message, errorCode, status);
    }
    
    public ErrorCode getCode() {
		return code;
	}
    
    public String getMessage() {
		return message;
	}
    
    public HttpStatus getStatus() {
		return status;
	}
    
    public LocalDateTime getTimestamp() {
		return timestamp;
	}

}