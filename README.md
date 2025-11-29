# Fantom ID

A tiny, universal ID generator compatible with JavaScript integers.
Built for generating evenly distributed database identifiers at high concurrency.

```js
import fantomid from "fantomid";
fantomid(); //=> 8209108814378532
```

Fantom ID works by generating a timestamp of 36 bits and 17 random bits in
reverse order.

Generating a timestamp ensures the IDs are distributed evenly across time,
while the remaining bits of entropy allows different nodes to generate IDs at
the exact same moment with a low chance of collision.

```

                                                      Bit-reverse
                                                          ◄─┐
     Random bits                   Timestamp                │
 ┌─────────────────┐ ┌────────────────────────────────────┐ │
 │11101001010100010│ │010000010110110011011011011000100100│ │
 └─────────────────┘ └────────────────────────────────────┘

 └────A2 D2 FF─────┘ └──────2025-11-24T19:13:45.994Z──────┘

```

The result is a JavaScript-safe integer represented in bit-reverse order, which
prevents hotspots by keeping the monotonic part of the ID last.

It works similarly to [UUIDv7](https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-04.html#name-uuid-version-7), but restrained to the size of JavaScript integers: 53 bits.
