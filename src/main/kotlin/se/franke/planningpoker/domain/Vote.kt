package se.franke.planningpoker.domain

data class Vote(val user: String, val value: String) {
    companion object {
        val possibleValues = listOf("0", "1/2", "1", "2", "3", "5", "8", "13")
    }

    init {
        require(possibleValues.contains(value)) { "Vote value not in $possibleValues" }
    }
}