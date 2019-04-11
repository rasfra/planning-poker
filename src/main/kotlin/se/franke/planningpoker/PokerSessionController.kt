package se.franke.planningpoker

import org.slf4j.LoggerFactory
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import java.math.BigDecimal

@RestController
class PokerSessionController(val pokerSessionRepository: PokerSessionRepository, val pokerService: PokerService) {
    val log = LoggerFactory.getLogger(PokerSessionController::class.java)

    @PostMapping("/api/v1/session")
    fun createSession(): String {
        val code = pokerSessionRepository.create().code
        log.info("Creating new session $code")
        return code
    }

    @GetMapping("/api/v1/session/{id}")
    fun getSession(@PathVariable id: String): SessionInfo {
        val session = pokerSessionRepository.getByCode(id)
        require(session != null) { "No session with id $id" }
        return SessionInfo(ArrayList(session.votes.values), Vote.possibleValues)
    }

    @MessageMapping("/vote/{code}")
    @SendTo("/topic/{code}")
    fun vote(@DestinationVariable code: String, voteMessage: VoteMessage): Vote {
        val vote = Vote(voteMessage.name, voteMessage.value)
        pokerSessionRepository.addVote(code, vote)
        log.info("${vote.name} voted ${vote.value} in session $code: ")
        return vote
    }
}

class VoteMessage(val name: String, val value: BigDecimal)

class SessionInfo(val votes: List<Vote>, val validValues: List<BigDecimal>)

class HelloMessage(var name: String)

class HelloResponse(var content: String)