package se.franke.planningpoker

interface PokerSessionRepository {
    fun create(): PokerSession
    fun getByPublicId(publicId: String): PokerSession?
    /**
     * Adds or silently overwrites a vote
     */
    fun addVote(publicId: String, vote: Vote)
}