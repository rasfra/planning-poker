package se.franke.planningpoker

import java.io.File
import kotlin.random.Random

class SessionCodeGenerator {
    val adjectives = ArrayList<String>()
    val animals = ArrayList<String>()

    init {
        File(SessionCodeGenerator::class.java.getResource("/adjectives.txt").toURI()).forEachLine { adjectives.add(it) }
        File(SessionCodeGenerator::class.java.getResource("/animals.txt").toURI()).forEachLine { animals.add(it) }
    }

    fun generate(): String {
        return randomEl(adjectives) + randomEl(animals)
    }

    private fun randomEl(list: List<String>): String {
        return list[Random.nextInt(list.size - 1)]
    }
}