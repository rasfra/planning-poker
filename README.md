# Planning poker

### Task
Collaborative planning app!

In order to estimate how complex a task is for a team of developers to complete, a common technique that is used is called "planning poker".
- Each developer gets to vote on a task by giving their estimate as a point.
- The set of points you can cast your vote on is usually a predefined set of arbitrary numbers, something like this: 0, 1/2, 1, 2, 3, 5, 8, 13.
- The higher the number, the more complex the task is to complete.

When everyone has cast their votes, the team can have a discussion about what points the different team members have given to a task.

This application should allow the team members to vote on a "task" and visualize the results of the vote in real-time.

The users of the application should be able to do the following:
- Create a poll. A user creates a poll and can share this with other people (this could for example be a code or a link).
- Join a pre-existing poll created by you or someone else. You should be able to cast your vote on different points in a predefined set (0, 1/2, 1, 2, 3, 5, 8, 13). A user can only vote once, but is permitted to change their vote.
- Visualize the results in real-time of a poll: Anyone should be able to see the results of a poll. If user A is casting a vote "2", user B should in real-time be able to see that the point "2" has a value of 1.

You are allowed to use any language/frameworks/libraries you want. We would like you to send in the code (e.g. as a link to github) the day before the interview. The app should come with clear and simple instructions for how to run it on a Mac.



## Out of scope/issues
- Vote range hard coded, would be nice with a few selectable sets of rules (fibonacchi, t-shirt sizes, etc)
- No life cycle of poker sessions, should be implemented if proper persistence is implemented.
- No tests
- Limited error handling, all errors are 5xx which limits what the client can do
- Ignored CORS stuff, in the real world the frontend would be deployed on the same domain and port as the backend  