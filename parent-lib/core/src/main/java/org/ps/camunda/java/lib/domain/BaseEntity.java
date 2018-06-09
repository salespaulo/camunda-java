package org.ps.camunda.java.lib.domain;

import java.io.Serializable;
import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.persistence.Version;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity<I> implements Serializable {
	
	private static final long serialVersionUID = 7408483307531670855L;

	@Id
	@Column(name = "id")
	protected I id;
	
    @Version  
    @Column(name = "version")  
    private Long version;
	
	@Column(name = "created_at", nullable = false)
	private ZonedDateTime createdAt;

	@Column(name = "updated_at")
	private ZonedDateTime updatedAt;

	@Column(name = "removed_at")
	private ZonedDateTime removedAt;
	
	@CreatedBy
	@Column(name = "created_by", nullable = false)
	private String createdBy;
	
	@LastModifiedBy
	@Column(name = "updated_by")
	private String updatedBy;
	
	public I getId() {
		return id;
	}
	
	public void setId(I id) {
		this.id = id;
	}
	
	public Long getVersion() {
		return version;
	}
	
	public void setVersion(Long version) {
		this.version = version;
	}

	public ZonedDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(ZonedDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public ZonedDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(ZonedDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public ZonedDateTime getRemovedAt() {
		return removedAt;
	}

	public void setRemovedAt(ZonedDateTime removedAt) {
		this.removedAt = removedAt;
	}
	
	public String getCreatedBy() {
		return createdBy;
	}
	
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	
	public String getUpdatedBy() {
		return updatedBy;
	}
	
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	@PrePersist
    public void setCreationDate() {
        this.createdAt = ZonedDateTime.now();
    }
	
	@PreUpdate
    public void setUpdatingDate() {
        this.updatedAt = ZonedDateTime.now();
    }
	
	@PreRemove
    public void setChangeDate() {
        this.removedAt = ZonedDateTime.now();
    }
	
	@Override
	public boolean equals(Object obj) {
		if (obj == this) return true;
		if (obj == null) return false;
		if (! this.getClass().isInstance(obj)) return false;
		@SuppressWarnings("unchecked")
		final BaseEntity<I> other = (BaseEntity<I>) obj;
		return new EqualsBuilder()
				.append(this.getId(), other.getId())
				.isEquals();
	}
	
	@Override
	public int hashCode() {
		return new HashCodeBuilder()
				.append(this.getId())
				.append(this.getVersion())
				.append(this.getCreatedAt())
				.toHashCode();
	}
	
	@Override
	public String toString() {
		return new ToStringBuilder(this)
				.append(this.getId())
				.append(this.getVersion())
				.append(this.getCreatedAt())
				.toString();
	}

}
