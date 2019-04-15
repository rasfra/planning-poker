package se.franke.planningpoker

import junit.framework.Assert.assertEquals
import org.junit.Assert
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import se.franke.planningpoker.domain.PokerService
import se.franke.planningpoker.domain.User
import se.franke.planningpoker.domain.Vote

@RunWith(SpringRunner::class)
@SpringBootTest
class PokerServiceTest {
    @Autowired
    lateinit var pokerService: PokerService

    @Test
    fun createSession() {
        val session = pokerService.create()
        Assert.assertNotNull(pokerService.getByCode(session.code))
    }

    @Test
    fun vote() {
        val user1 = User("a user")
        val user2 = User("a changing user")
        val user3 = User("yet another user")

        val session = pokerService.create()
        val vote1 = Vote(Vote.possibleValues[0])
        val vote2 = Vote(Vote.possibleValues[1])

        pokerService.addVote(session.code, user1, vote1)
        pokerService.addVote(session.code, user2, vote2)
        pokerService.addVote(session.code, user3, vote2)
        pokerService.addVote(session.code, user2, vote1)
        val updated = pokerService.getByCode(session.code)!!

        assertEquals(3, updated.votes.entries.size)
        assertEquals(vote1, updated.votes[user1])
        assertEquals(vote1, updated.votes[user2])
        assertEquals(vote2, updated.votes[user3])

    }

    @Test
    fun reset() {
        val session = pokerService.create()
        pokerService.addVote(session.code, User("a user"), Vote(Vote.possibleValues[0]))
        pokerService.addVote(session.code, User("another user"), Vote(Vote.possibleValues[1]))
        assertEquals(2, pokerService.getByCode(session.code)?.votes?.size)
        pokerService.clearVotes(session.code)
        assertEquals(0, pokerService.getByCode(session.code)?.votes?.size)
    }

}
