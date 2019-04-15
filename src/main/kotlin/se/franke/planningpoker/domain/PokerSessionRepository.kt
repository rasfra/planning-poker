package se.franke.planningpoker.domain

interface PokerSessionRepository {
    fun store(session: PokerSession)
    fun getByCode(code: String): PokerSession?
    fun update(session: PokerSession)
}