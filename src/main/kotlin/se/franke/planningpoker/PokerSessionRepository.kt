package se.franke.planningpoker

interface PokerSessionRepository {
    fun create(): PokerSession
    fun getByCode(code: String): PokerSession?
    /**
     * Adds or silently overwrites a vote
     */
    fun addVote(code: String, vote: Vote)
}