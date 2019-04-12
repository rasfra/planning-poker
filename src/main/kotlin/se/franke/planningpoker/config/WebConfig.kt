package se.franke.planningpoker.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
class WebConfig : WebMvcConfigurer {

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
    }

    // Forwards requests to react router
    override fun addViewControllers(registry: ViewControllerRegistry) {
        registry.addViewController("/{spring:\\w+}")
                .setViewName("forward:/")
        registry.addViewController("/**/{spring:\\w+}")
                .setViewName("forward:/")
        registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
                .setViewName("forward:/")
    }
}