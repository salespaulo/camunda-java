package org.ps.camunda.java.api.gateway;

import org.ps.camunda.java.lib.core.MoreInfo;
import org.ps.camunda.java.lib.core.http.HttpRestClient;
import org.ps.camunda.java.lib.core.log.LogAspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.sleuth.sampler.AlwaysSampler;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

@EnableZuulProxy
@EnableDiscoveryClient
@SpringBootApplication
public class GatewayServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServerApplication.class, args)
				.getBean(MoreInfo.class)
				.info();
	}

	@Bean
	public MoreInfo moreInfo() {
		return new MoreInfo();
	}

	@Bean
	public AlwaysSampler defaultSampler() {
		return new AlwaysSampler();
	}

	@Bean
	public LogAspect logAspect() {
		return new LogAspect();
	}
	
	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	@Autowired
	public HttpRestClient httpRestClient(RestTemplate restTemplate, ObjectMapper objectMapper) {
		return new HttpRestClient(restTemplate, objectMapper);
	}
	
}
