package se.franke.planningpoker.infra

import org.springframework.stereotype.Component
import se.franke.planningpoker.domain.SessionCodeGenerator
import kotlin.random.Random

@Component
class AnimalCodeGenerator : SessionCodeGenerator {
    private val adjectives = ArrayList<String>()
    private val animals = ArrayList<String>()

    init {
        AnimalCodeGenerator::class.java.getResourceAsStream("/adjectives.txt").bufferedReader()
                .use { reader ->
                    reader.readLines().forEach { adjectives.add(it) }
                }
        AnimalCodeGenerator::class.java.getResourceAsStream("/animals.txt").bufferedReader()
                .use { reader ->
                    reader.readLines().filter { it.length <= 10 }.forEach { animals.add(it) }
                }
    }

    override fun next(): String {
        return randomEl(adjectives) + randomEl(animals)
    }

    private fun randomEl(list: List<String>): String {
        return list[if (list.size > 1) Random.nextInt(list.size - 1) else 0]
    }
}