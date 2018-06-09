package org.ps.camunda.java.lib.core.api;

import org.springframework.hateoas.ResourceSupport;

public abstract class ApiResource extends ResourceSupport {

	private Long version;
	private String createdAt;

	public ApiResource() {
		super();
	}
	
	public ApiResource(Long version, String createdAt) {
		super();
		this.version = version;
		this.createdAt = createdAt;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

}
