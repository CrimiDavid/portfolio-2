---
title: How I Reduced Backend API Load by 90% and Boosted Performance
date: "2025-05-29"
description: "How I reduced backend API load by over 90% using a Redis-backed caching strategy and a custom polling microservice—without sacrificing real-time data delivery."
micro: false
---

*It all started with a performance problem I could not ignore any longer...*

# The Problem
I've been building an application that deals with displaying live data. I decided to use polling instead of more complex solutions like WebSockets or server-sent events since the data
I needed was updated relatively infrequently. I had 4 endpoints being polled all in different times but all
within 10 seconds averaging to about 1.2 API *calls per second per user* and the system handled this load just fine!

I knew however that issues are bound to happen. As the user count increases, this polling strategy becomes a serious liability.
My backend hosted on a single `t2.micro` EC2 instance running a FastAPI application behind a nginx reverse proxy isn't going to keep up for long.
Not only does it need to handle the constant polling traffic, but it also supports other critical functions like user logins and various core features of the application.
The instance’s limited CPU and memory will start to show strain quickly, as the server begins receiving a high volume of redundant requests, since users are **polling for the same** data.
This redundancy not only saturates the API but also wastes valuable resources, leading to increased latency and a degraded user experience. As the load continues to scale, the backend becomes a bottleneck, so it was time to hit the drawing board.

![Figure1](/blog-images/poll/poll_bad.png)
Redundant Client Polling to Backend

---

# My Solution
Since the data that users needed to poll for was always going to be the same across all clients, I realized I could extract this redundancy and solve it architecturally. My goal was simple: make my backend receive a constant number of requests, independent of the number of users on the site.
The solution I chose was both simple and effective: introduce a Redis caching layer and a dedicated polling microservice.

![Figure2](/blog-images/poll/poll_good.png)
The improved architecture with polling microservice and Redis cache

---

So how does this work?
The polling microservice (I chose to write mine in Java) acts as a single, dedicated client that mirrors the original polling patterns. Here's the flow:

1. **The microservice polls the backend** - It makes the same API calls that individual users were making, but now there's only one client doing it
2. **Data gets cached in Redis** - Each time it polls, the microservice writes the fresh data into Redis, overwriting the existing keys to ensure the data is always current
3. **Frontend clients read from Redis** - Instead of hitting the backend directly, clients now poll Redis for the most up-to-date information

## Why Is This Better?
This approach dramatically reduces the load on our backend by:
**eliminating redundant requests** - Instead of 1,000 users making 1,200 requests/second to our backend, we now have just 1 microservice making ~1.2 requests/second, making the backend load constant and predictable. 
Second, we're leveraging Redis's strengths as a **purpose-built caching** solution that can handle millions of reads per second, while our `t2.micro` backend would have struggled with just hundreds of requests. 
Finally, we **maintain data freshness** since users still get real-time data updates and the polling frequency remains the same from their perspective, but now we're serving from an ultra-fast cache instead of hitting our database repeatedly.

### Potential Trade-offs
While this solution significantly improves efficiency, it's not without trade-offs—most notably, **we're sacrificing a degree of reliability for scalability**. The biggest drawback is that the entire system’s data freshness now depends on a **single point of failure: the polling microservice**. If that service goes down, the Redis cache stops receiving updates, and all clients begin fetching stale data. This introduces a critical vulnerability, where a failure in one component affects the entire user base.

Fortunately, this risk can be mitigated by introducing redundant pollers. By running multiple instances of the polling microservice, possibly with leader election or simple failover logic we can ensure that if one instance fails, others seamlessly continue fetching and caching fresh data, preserving both uptime and consistency.

While my current solution introduces some reliability trade-offs, it's a compromise I'm comfortable with for now given the simplicity and performance benefits. However, as my application evolves and reliability becomes a more critical concern, I plan to explore alternative architectures that strike a better balance between **performance, scalability, and fault tolerance**.

## Pub/Sub
Most of you reading this are probably screaming "just use pub/sub!" - and that was actually my original plan. Instead of having clients poll Redis, I wanted to establish WebSocket connections with Redis and push out changes as they happened in real-time.
However, I hit a roadblock: my Redis database is hosted on Upstash, which doesn't support WebSocket connections. To work around this, I experimented with adding another web server that clients would establish WebSocket connections with, while that server would poll Upstash for updates and push them to connected clients.

After implementing and testing this approach, I found the performance/reliability gains weren't worth the added complexity(for me). The architecture now involved:
* My original backend
* A polling microservice
* Redis on Upstash
* A WebSocket server
* Additional connection management logic

The marginal performance improvement didn't justify the operational overhead, debugging complexity, and additional points of failure.
But **I suspect there's more optimization potential here**. Intuitively, I feel like there are ways to make the pub/sub approach more worthwhile, especially as user count scales further. If you have suggestions for optimizing this architecture or alternative approaches I should consider, I'd love to hear your thoughts!

## Event Streaming
I am currently experimenting with Apache Kafka to get around the limitation of not being able to establish WebSocket connections with my Upstash Redis database. This approach seems promising - I am able to push my data to Kafka topics and getting real-time updates to clients.
However, I ran into two roadblocks:
1. **Initial State Problem:** On initial connection to the Kafka topics, the data is null, meaning users don't see any content when they first load the site. This is a mandatory functionality for my app, users need to see the current state immediately, not wait for the next update to come through.
2. **Complex Data Formatting:** My backend serves complex JSON data structures, and I'm encountering issues getting this formatted data into Kafka topics and then reliably relaying it to the frontend in a usable format.

I'm optimistic about its long-term viability, although it still needs work before it can fully replace my current setup.


# Final Thoughts
What started as a simple polling setup gradually became an architectural challenge  one that pushed me to rethink how real-time data should be delivered at scale. By introducing a dedicated polling microservice and caching layer with Redis, I was able to reduce backend API load by over 90%, while simultaneously improving application responsiveness and reliability.

This architecture isn’t perfect, and there’s definitely room for future optimization  especially if I revisit WebSocket or Kafka-based solutions. But for now, the system is **stable, scalable, and easy to maintain**, giving me confidence that my web app can handle increased load and continue delivering content reliably, even as the user base grows.

If you're facing a similar problem with redundant API calls or performance bottlenecks under high concurrency, don’t overlook the power of caching and architectural simplification. Sometimes, the most effective solutions are also the most straightforward.

I’d love to hear how others are solving similar challenges  feel free to reach out either on [X](https://x.com/Crimid19) or [LinkedIn](https://www.linkedin.com/in/david-crimi/)! id love to hear from you.

