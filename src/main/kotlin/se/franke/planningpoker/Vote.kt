package se.franke.planningpoker

import java.math.BigDecimal

data class Vote(val name: String, val value: BigDecimal) {
    companion object {
        val possibleValues = listOf("0", "0.5", "1", "2", "3", "5", "8", "13").map { BigDecimal(it) }
    }

    init {
        require(possibleValues.contains(value)) { "Vote value not in $possibleValues" }
    }
}