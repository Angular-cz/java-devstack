package cz.angular;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.MimeMappings;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application implements EmbeddedServletContainerCustomizer {

  public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

  @Override
  public void customize(ConfigurableEmbeddedServletContainer container) {
    MimeMappings mappings = new MimeMappings(MimeMappings.DEFAULT);
    mappings.add("html", "text/html;charset=utf-8");
    container.setMimeMappings(mappings );
  }
}
