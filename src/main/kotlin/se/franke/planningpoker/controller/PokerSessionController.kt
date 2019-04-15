package se.franke.planningpoker.controller

import org.slf4j.LoggerFactory
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import se.franke.planningpoker.domain.PokerService
import se.franke.planningpoker.domain.Vote

@RestController
class PokerSessionController(val pokerService: PokerService) {
    val log = LoggerFactory.getLogger(PokerSessionController::class.java)

    @PostMapping("/api/v1/session")
    fun createSession(): String {
        val code = pokerService.create().code
        log.info("Creating new session $code")
        return code
    }

    @GetMapping("/api/v1/session/{code}")
    fun getSession(@PathVariable code: String): SessionState {
        val session = pokerService.getByCode(code)
        require(session != null) { "No session with id $code" }
        return SessionState(session.votes.entries.map { VoteDTO(it.key, it.value.value) }, Vote.possibleValues)
    }

    @MessageMapping("/clear/{code}")
    @SendTo("/topic/clear/{code}")
    fun clearVotes(@DestinationVariable code: String): String {
        pokerService.clearVotes(code)
        log.info("Clearing votes in session $code")
        return "" // No body, the existance of the message itself is the important thing.
    }

    @MessageMapping("/vote/{code}")
    @SendTo("/topic/{code}")
    fun vote(@DestinationVariable code: String, voteDTO: VoteDTO): VoteDTO {
        val vote = Vote(voteDTO.name, voteDTO.value)
        pokerService.addVote(code, vote)
        log.info("${vote.user} voted ${vote.value} in session $code: ")
        return voteDTO
    }
}

class SessionState(val votes: Collection<VoteDTO>, val validValues: List<String>)
class VoteDTO(val name: String, val value: String)