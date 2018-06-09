package org.ps.camunda.java.lib.core;

import java.lang.management.ManagementFactory;
import java.lang.management.RuntimeMXBean;
import java.util.Collection;
import java.util.stream.Stream;

import org.ps.camunda.java.lib.core.log.LogAspect;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;

@Component
public class MoreInfo {

	public void info() {
		final Logger logger = LogAspect.logger.apply(getClass());
		final RuntimeMXBean runtimeMxBean = ManagementFactory.getRuntimeMXBean();
		
		logger.info("###################################");
		logger.info("### JVM PARAMETERS & MORE INFOS ###");

		this.format(runtimeMxBean.getInputArguments(), "### ARG")
				.forEach(logger::info);

		logger.info("###################################");
	}
	
	private Stream<String> format(Collection<String> list, String term) {
		return list.stream().map(s-> term + " " + s);
	}
	
}