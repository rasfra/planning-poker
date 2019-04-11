package se.franke.planningpoker

import org.springframework.stereotype.Repository
import java.util.UUID
import kotlin.collections.HashMap

@Repository
class InMemoryPollRepository : PokerSessionRepository {
    val sessionMap: MutableMap<String, PokerSession> = HashMap()
    val sessionCodeGenerator = SessionCodeGenerator()

    override fun create(): PokerSession {
        val id = UUID.randomUUID()
        val session = PokerSession(id, sessionCodeGenerator.generate())
        sessionMap[session.code] = session
        return session
    }

    override fun getByCode(code: String): PokerSession? {
        return sessionMap[code]
    }

    override fun addVote(code: String, vote: Vote) {
        val session = getByCode(code)
        require(session != null) { "No session with id $code" }
        session.votes[vote.name] = vote
    }

    override fun clearVotes(code: String) {
        getByCode(code)?.votes?.clear()

    }
}