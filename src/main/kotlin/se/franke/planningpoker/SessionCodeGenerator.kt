package se.franke.planningpoker

import kotlin.random.Random

class SessionCodeGenerator {
    private val adjectives = ArrayList<String>()
    private val animals = ArrayList<String>()

    init {
        SessionCodeGenerator::class.java.getResourceAsStream("/adjectives.txt").bufferedReader()
                .use { reader ->
                    reader.readLines().forEach { adjectives.add(it) }
                }
        SessionCodeGenerator::class.java.getResourceAsStream("/animals.txt").bufferedReader()
                .use { reader ->
                    reader.readLines().filter { it.length <= 10 }.forEach { animals.add(it) }
                }
    }

    fun generate(): String {
        return randomEl(adjectives) + randomEl(animals)
    }

    private fun randomEl(list: List<String>): String {
        return list[if (list.size > 1) Random.nextInt(list.size - 1) else 0]
    }
}