package org.ps.camunda.java.example;

import org.camunda.bpm.spring.boot.starter.annotation.EnableProcessApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableProcessApplication
@SpringBootApplication
public class CamundaBpmnPlaygroudApplication {

	public static void main(final String... args) {
		SpringApplication.run(CamundaBpmnPlaygroudApplication.class, args);
	}
	
}
