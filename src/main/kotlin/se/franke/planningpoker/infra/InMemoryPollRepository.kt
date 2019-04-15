package se.franke.planningpoker.infra

import org.springframework.stereotype.Repository
import se.franke.planningpoker.domain.PokerSession
import se.franke.planningpoker.domain.PokerSessionRepository

@Repository
class InMemoryPollRepository : PokerSessionRepository {
    val sessionMap: MutableMap<String, PokerSession> = HashMap()

    override fun store(session: PokerSession) {
        sessionMap[session.code] = session
    }

    override fun getByCode(code: String): PokerSession? {
        return sessionMap[code]
    }

    override fun update(session: PokerSession) {
        sessionMap[session.code] = session
    }
}