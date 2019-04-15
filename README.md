# Planning poker

## How to build & run
### Requirements
- Java JDK 8
- Node/NPM

To start the application simply execute and `run.sh` open a web browser at http://localhost:8080.  

This runs `npm install`, `npm run build` and then assembles both the react app and the backend application into a single fat jar before running it.

### Development
For rapid deployments during development, the backend can be run via `PlanningPokerApplication` on http://localhost:8080 with a `development` spring profile to get around same-origin policy (CORS), followed by `frontend/npm start` to serve the frontend on http://localhost:3000

## Out of scope/known issues
MVP focus to keep a reasonable scope meaning:   
- No tests
- Simple GUI, no side/top/footer, limited responsiveness, console error logging only
- No persistence, in memory only
- No life cycle of poker sessions, should be implemented if proper persistence is implemented.
- No login, users are trusted to provide their name and only their name.
- Might use features not compatible with older browsers (skipping SockJS, some css might not be compatible with every browser etc.)
- Frontend and backend are bundled in a single deployment for convenience and avoid CORS issues, which of course disallows redeploying only the front or backend.
- One hard coded localhost domain to get web sockets working (would have preferred a relative one).
- Vote range hard coded, would be nice with a few selectable sets of rules (fibonacchi, t-shirt sizes, etc).