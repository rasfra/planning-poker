package se.franke.planningpoker.config

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
@Profile("development")
class DevWebConfig : WebMvcConfigurer {

    // Allows connections from other ports when developing
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
    }
}