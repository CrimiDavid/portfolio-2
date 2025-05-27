---
title: How I Reduced Backend API Load by 90% and Boosted Performance
date: "2025-05-27"
description: "No description (yet)"
micro: false
---

*It all started with a performance problem I could not ignore any longer...*

I've been building an application that deals with displaying live data. I decided to use polling instead of more complex solutions like WebSockets or server-sent events since the data
I needed was updated relatively infrequently. I had 4 endpoints being polled all in different times but all
within 10 seconds averaging to about 1.2 API *calls per second per user* and the system handled this load just fine!

I knew however that issues are bound to happen. As the user count increases, this polling strategy becomes a serious liability.
My backend hosted on a single `t2.micro` EC2 instance running a FastAPI application behind a nginx reverse proxy isn't going to keep up for long.
Not only does it need to handle the constant polling traffic, but it also supports other critical functions like user logins and various core features of the application.
The instance’s limited CPU and memory will start to show strain quickly, as the server begins receiving a high volume of redundant requests, since users are **polling for the same** public data.
This redundancy not only saturates the API but also wastes valuable resources, leading to increased latency and a degraded user experience. As the load continues to scale, the backend becomes a bottleneck, so it was time to hit the drawing board.

![Figure1](/blog-images/poll/poll_bad.png)
visual of problem depicted above
---



When your backend starts buckling under the weight of constant client requests, it's time to get creative with your architecture. That's exactly what happened when I discovered that each of my clients was hammering 5 identical endpoints every 10 seconds, creating a perfect storm of database queries and computational overhead that was bringing my system to its knees.
The problem was straightforward but brutal: multiple clients independently polling the same resource-intensive endpoints, each triggering expensive database operations and complex calculations. Every 10 seconds, my backend would get slammed with redundant requests, essentially doing the same work over and over again for data that hadn't even changed.
The solution? A complete paradigm shift from reactive polling to proactive caching.
I built a multithreaded Java service that acts as an intelligent intermediary between my clients and backend. Instead of letting clients directly pound my main API, this service polls the backend once, performs all the heavy lifting, then stores the fresh results in Redis by overwriting the keys each cycle. Now my frontend clients simply fetch the pre-computed, up-to-date data from Redis—no database strain, no redundant calculations, just blazing-fast cache hits.
The results were immediate and dramatic: a 90% improvement in backend performance, significantly reduced database load, and happier clients getting their data faster than ever before.
Here's how I architected this solution and the key lessons learned along the way.

