package se.franke.planningpoker.domain

import org.springframework.stereotype.Service
import java.util.*
import kotlin.collections.HashMap

@Service
class PokerService(val repository: PokerSessionRepository, val sessionCodeGenerator: SessionCodeGenerator) {

    fun create(): PokerSession {
        val id = UUID.randomUUID()
        val session = PokerSession(id, sessionCodeGenerator.next(), HashMap())
        repository.store(session)
        return session
    }

    fun getByCode(code: String): PokerSession? {
        return repository.getByCode(code)
    }

    fun addVote(code: String, user: User, vote: Vote) {
        val session = getByCode(code)
        require(session != null) { "No session with id $code" }
        repository.update(PokerSession(session.id, session.code, HashMap(session.votes).also { it[user] = vote }))
    }

    fun clearVotes(code: String) {
        val session = getByCode(code)
        require(session != null) { "No session with id $code" }
        repository.update(PokerSession(session.id, session.code, emptyMap()))
    }
}