package org.ps.camunda.java.lib.core.log;

import java.util.Arrays;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.SourceLocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
public class LogAspect {

	private static final String POINTCUT_LOG = "@annotation(Log)";
	private static final String POINTCUT_REQUEST = "@annotation(org.springframework.web.bind.annotation.RequestMapping)";
	private static final String POINTCUT_PACKAGE = "execution(* br.com.finch.xgracco.*.*(..))";

	public static final Function<Class<?>, Logger> logger = clazz -> LoggerFactory.getLogger(clazz);
	
	@Value("${spring.application.name}")
	private String applicationName;

	@Around(POINTCUT_LOG)
	public Object loggerAroundLog(ProceedingJoinPoint joinPoint) throws Throwable {
		// TODO Implement it
		try {
			return joinPoint.proceed();
		} catch (Throwable e) {
			throw e;
		}
	}

	@Before(POINTCUT_PACKAGE)
	public void loggerBefore(JoinPoint joinPoint) {
		final Logger log = logger.apply(joinPoint.getThis().getClass());
		final SourceLocation source = joinPoint.getSourceLocation();
		final Signature signature = joinPoint.getSignature();
		final Object[] args = joinPoint.getArgs();

		log.debug("ApplicationName={} BEFORE Source={} SourceLine={} Method={} MethodArgs={}", 
				this.applicationName, source.getFileName(), source.getLine(), signature.getDeclaringTypeName(), 
				Arrays.toString(args));
	}

	@AfterReturning(value = POINTCUT_PACKAGE, returning = "result")
	public void loggerAfterReturning(JoinPoint joinPoint, Object result) {
		final Logger log = logger.apply(joinPoint.getThis().getClass());
		final SourceLocation source = joinPoint.getSourceLocation();
		final Signature signature = joinPoint.getSignature();
		final Object[] args = joinPoint.getArgs();

		log.debug("ApplicationName={} AFTER Returning={} from Source={} SourceLine={} Method={} MethodArgs={}", 
				this.applicationName, result, source.getFileName(), source.getLine(), signature.getDeclaringTypeName(), 
				Arrays.toString(args));
	}

	@AfterThrowing(value = POINTCUT_PACKAGE, throwing = "e")
	public void loggerAfterThrowing(JoinPoint joinPoint, Throwable e) {
		final Logger log = logger.apply(joinPoint.getThis().getClass());
		final SourceLocation source = joinPoint.getSourceLocation();
		final Signature signature = joinPoint.getSignature();
		final Object[] args = joinPoint.getArgs();

		log.error("ApplicationName={} ERROR={} from Source={} SourceLine={} Method={} MethodArgs={}", 
				this.applicationName, e.getMessage(), source.getFileName(),
				source.getLine(), signature.getDeclaringTypeName(), Arrays.toString(args));
	}

	@Before(POINTCUT_REQUEST)
	public void loggerAroundRequestMapping(JoinPoint joinPoint) throws Throwable {
		final Logger log = logger.apply(joinPoint.getThis().getClass());
		final HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

		this.log(log, request);
	}

	@AfterReturning(value = POINTCUT_REQUEST, returning = "result")
	public void loggerAfterRequestMappingReturning(JoinPoint joinPoint, Object result) {
		final Logger log = logger.apply(joinPoint.getThis().getClass());
		final HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		final HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();

		this.log(log, request, response, result);
	}

	private void log(final Logger log, final HttpServletRequest request) {
		log.info("ApplicationName={} REQUEST Protocol={} HttpMethod={} RequestURI={} from RemoteAddr={} with Params={}",
				this.applicationName, request.getProtocol(), request.getMethod(), request.getRequestURI(), 
				request.getRemoteAddr(), toString(request.getParameterMap()));
	}

	private void log(final Logger log, final HttpServletRequest request, final HttpServletResponse response, final Object result) {
		log.info("ApplicationName={} RESPONSE HttpStatus={} Protocol={} HttpMethod={} RequestURI={} from RemoteAddr={} with Body={}",
				this.applicationName, response.getStatus(), request.getProtocol(), request.getMethod(), request.getRequestURI(),
				request.getRemoteAddr(), result);
	}

	private String toString(Map<String, String[]> map) {
		return map
				.entrySet()
				.stream()
				.map(this::toString)
				.collect(Collectors.joining(";"));
	}
	
	private String toString(Entry<String, String[]> entry) {
		return entry.getKey() + ": " + Arrays.toString(entry.getValue());
	}


}