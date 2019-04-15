package se.franke.planningpoker.domain

import java.util.*

data class PokerSession(val id: UUID, val code: String, val votes: Map<User, Vote>)