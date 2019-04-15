package se.franke.planningpoker.domain

interface SessionCodeGenerator {
    fun next(): String
}