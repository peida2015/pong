[Live](http://peida2015.github.io/pong/pong.html)

A classic arcade game written in Javascript.  It's a game I spent a lot of time playing after school when I was in middle school.  These are the challenges I encountered several challenges while I coded the game:
- [ ] Detecting collision between ball and paddles
- [ ] Deciding how the ball's velocity changes when it hits the paddle
- [ ] Deciding how the AI player reacts

How I solved the problems:
1. To detect collision, I approximated detection by checking if the center of the ball is within the range of the paddle's length when its outer surface reaches the baseline.  This approximation works fairly well in most cases, but it could fail to detect at some edge cases.

2. To make the game more interesting, the velocity of the ball has to change, but the change should not be too drastic, either.  I don't know the exact dynamic.  My solution is based on relative position (height) of the ball and the center of paddle.

3. The AI player has access to the ball's position.  Its paddle reacts to the ball by finding whether the ball is to the left or to the right of its center.  But it won't be very fun if the computer always wins.  So the computer only responds with a move (1 or -1) only ~ half of the time, other times it returns 0.  A random number generator is used to decide whether AI player responds.



Known bugs:
1. Collision detection fails at some edge cases.
