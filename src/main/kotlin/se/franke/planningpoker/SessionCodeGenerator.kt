package se.franke.planningpoker

import java.io.File
import kotlin.random.Random

class SessionCodeGenerator {
    private val adjectives = ArrayList<String>()
    private val animals = ArrayList<String>()

    init {
        File(SessionCodeGenerator::class.java.getResource("/adjectives.txt").toURI())
                .forEachLine { adjectives.add(it) }
        File(SessionCodeGenerator::class.java.getResource("/animals.txt").toURI())
                .forEachLine { if (it.length < 10) animals.add(it) } // Some are a bit.. long
    }

    fun generate(): String {
        return randomEl(adjectives) + randomEl(animals)
    }

    private fun randomEl(list: List<String>): String {
        return list[Random.nextInt(list.size - 1)]
    }
}