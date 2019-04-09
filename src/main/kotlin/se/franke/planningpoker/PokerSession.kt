package se.franke.planningpoker

import java.util.*

data class PokerSession(val id: UUID, val publicId: String) {
    val votes: MutableMap<String, Vote> = HashMap()
}

