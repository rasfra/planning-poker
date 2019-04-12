# Planning poker

## How to build & run
### Requirements
- Java JDK 8
- Node/NPM

To start the application first run
```
build.sh
``` 
This assembles both the react app and backend into a single fat jar. To run the application execute
```
run.sh
``` 
Then open a web browser at http://localhost:8080

## Out of scope/known issues
### General
- No tests
- no pretty error messages

### Backend
- Vote range hard coded, would be nice with a few selectable sets of rules (fibonacchi, t-shirt sizes, etc).
- No life cycle of poker sessions, should be implemented if proper persistence is implemented.
- No persistence, in memory only
- No security, user is trusted.

### Frontend
- Might use features not compatible with older browsers (skipping SockJS etc.)
- Ignored CORS stuff, in the real world the frontend would be deployed on the same domain and port as the backend
- Some hard coded localhost urls
- PokerSession might be a bit large
- First time I'm using both react and typescript so there are probably several minor/major breaches of best practices.
- Limited effort put into the styling side of the application, keeping it simple.