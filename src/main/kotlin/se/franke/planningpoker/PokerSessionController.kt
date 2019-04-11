package se.franke.planningpoker

import org.slf4j.LoggerFactory
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class PokerSessionController(val pokerSessionRepository: PokerSessionRepository, val pokerService: PokerService) {
    val log = LoggerFactory.getLogger(PokerSessionController::class.java)

    @PostMapping("/api/v1/session")
    fun createSession(): String {
        val code = pokerSessionRepository.create().code
        log.info("Creating new session $code")
        return code
    }

    @GetMapping("/api/v1/session/{code}")
    fun getSession(@PathVariable code: String): SessionInfo {
        val session = pokerSessionRepository.getByCode(code)
        require(session != null) { "No session with id $code" }
        return SessionInfo(ArrayList(session.votes.values), Vote.possibleValues)
    }

    @MessageMapping("/clear/{code}")
    @SendTo("/topic/clear/{code}")
    fun clearVotes(@DestinationVariable code: String): String {
        pokerSessionRepository.clearVotes(code)
        log.info("Clearing votes in session $code")
        return "CLEAR" // body won't be read, just trigger something. Can empty messages be sent?
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

class VoteMessage(val name: String, val value: String)

class SessionInfo(val votes: List<Vote>, val validValues: List<String>)