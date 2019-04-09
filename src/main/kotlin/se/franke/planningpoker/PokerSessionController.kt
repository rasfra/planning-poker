package se.franke.planningpoker

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.web.bind.annotation.*
import java.math.BigDecimal

@RestController
class PokerSessionController(val pokerSessionRepository: PokerSessionRepository, val pokerService: PokerService) {
    @PostMapping("/api/v1/session")
    fun createSession(): String {
        return pokerSessionRepository.create().publicId
    }

    @GetMapping("/api/v1/session/{id}")
    fun getSession(@PathVariable id: String): SessionInfo {
        val session = pokerSessionRepository.getByPublicId(id)
        require(session != null) { "No session with id $id" }
        return SessionInfo(ArrayList(session.votes.values), Vote.possibleValues)
    }

    @PostMapping("/api/v1/session/{id}/votes")
    fun vote(@PathVariable id: String, @RequestBody vote: PlayerVote) {
        pokerSessionRepository.addVote(id, Vote(vote.name, vote.value))
    }

    @MessageMapping("hello")
    @SendTo("/topic/greetings")
    fun greeting(hello: HelloMessage): HelloResponse {
        Thread.sleep(1000) // simulated delay
        return HelloResponse("Hello ${hello.name}")
    }

}

class PlayerVote(val name: String, val value: BigDecimal)

class SessionInfo(val votes: List<Vote>, val validValues: List<BigDecimal>)

class HelloMessage(var name: String)

class HelloResponse(var content: String)