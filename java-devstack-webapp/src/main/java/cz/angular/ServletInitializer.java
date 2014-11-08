package cz.angular;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.MimeMappings;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.web.filter.CharacterEncodingFilter;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

public class ServletInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {

		return application.sources(Application.class);
	}

  @Override
  public void onStartup(ServletContext servletContext) throws ServletException {
    super.onStartup(servletContext);

    FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encoding-filter", new CharacterEncodingFilter());
    encodingFilter.setInitParameter("encoding", "UTF-8");
    encodingFilter.setInitParameter("forceEncoding", "true");
    encodingFilter.addMappingForUrlPatterns(null, true, "/*");
  }

}
