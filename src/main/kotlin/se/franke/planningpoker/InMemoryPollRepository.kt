package se.franke.planningpoker

import org.springframework.stereotype.Repository
import java.util.*
import java.util.UUID

@Repository
class InMemoryPollRepository : PokerSessionRepository {
    val sessionMap: MutableMap<UUID, PokerSession> = HashMap()
    val sessionCodeGenerator = SessionCodeGenerator()

    override fun create(): PokerSession {
        val id = UUID.randomUUID()
        val session = PokerSession(id, sessionCodeGenerator.generate())
        sessionMap[session.id] = session
        return session
    }

    override fun getByCode(code: String): PokerSession? {
        return sessionMap.values.firstOrNull { it.code == code }
    }

    override fun addVote(code: String, vote: Vote) {
        val session = getByCode(code)
        require(session != null) { "No session with id $code" }
        session.votes[vote.name] = vote
    }
}