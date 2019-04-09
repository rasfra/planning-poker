package se.franke.planningpoker

import org.springframework.stereotype.Repository
import java.util.*
import java.util.UUID

@Repository
class InMemoryPollRepository : PokerSessionRepository {
    val sessionMap: MutableMap<UUID, PokerSession> = HashMap()
    val PublicIdGenerator = PublicIdGenerator()

    override fun create(): PokerSession {
        val id = UUID.randomUUID()
        val session = PokerSession(id, PublicIdGenerator.generate())
        sessionMap[session.id] = session
        return session
    }

    override fun getByPublicId(publicId: String): PokerSession? {
        return sessionMap.values.firstOrNull { it.publicId == publicId }
    }

    override fun addVote(publicId: String, vote: Vote) {
        val session = getByPublicId(publicId)
        require(session != null) { "No session with id $publicId" }
        session.votes[vote.name] = vote
    }
}