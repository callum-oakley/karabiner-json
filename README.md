# substan41

A keymap for 41 keys which maps on to a subset of most standard keyboards.

```
  ╭  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐      ╮
  │  │ tab │  q  │  w  │  e  │  r  │  t  │  y  │  u  │  i  │  o  │  p  │  '  │      │
  │  └┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┐     │
  │   │ nav │  a  │  s  │  d  │  f  │  g  │  h  │  j  │  k  │  l  │  ;  │ num │     │
base  └──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┐  │
  │      │shift│  z  │  x  │  c  │  v  │  b  │  n  │  m  │  ,  │  .  │  /  │shift│  │
  │      └────┬┴────┬┴─────┼─────┴─────┴─────┴─────┴─────┼─────┴┬────┴┬────┴─────┘  │
  │           │ alt │ cmd  │            space            │ ctrl │ alt │             │
  ╰           └─────┴──────┴─────────────────────────────┴──────┴─────┘             ╯

  ╭  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐      ╮
  │  │     │     │     │prev │next │     │     │ bsp │ up  │ del │caps │     │      │
  │  └┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┐     │
  │   │╳╳╳╳╳│     │ esc │ alt │shift│     |     |left │down │right│enter│     │     │
 nav  └──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┐  │
  │      │     │     │     │back │ fwd │     │     │     │     │     │     │     │  │
  │      └────┬┴────┬┴─────┼─────┴─────┴─────┴─────┴─────┼─────┴┬────┴┬────┴─────┘  │
  │           │     │      │                             │      │     │             │
  ╰           └─────┴──────┴─────────────────────────────┴──────┴─────┘             ╯

  ╭  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐      ╮
  │  │  `  │  1  │  2  │  3  │  4  │  5  │     │vol- │vol+ │     │     │     │      │
  │  └┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┐     │
  │   │     │  6  │  7  │  8  │  9  │  0  |     |shift│ alt │ fn  │     │╳╳╳╳╳│     │
 num  └──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┐  │
  │      │     │  -  │  =  │  \  │  [  │  ]  │     │bri- │bri+ │     │     │     │  │
  │      └────┬┴────┬┴─────┼─────┴─────┴─────┴─────┴─────┼─────┴┬────┴┬────┴─────┘  │
  │           │     │      │                             │      │     │             │
  ╰           └─────┴──────┴─────────────────────────────┴──────┴─────┘             ╯

  ╭  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐      ╮
  │  │     │ f1  │ f2  │ f3  │ f4  │ f5  │     │     │     │     │     │     │      │
  │  └┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┐     │
  │   │     │ f6  │ f7  │ f8  │ f9  │ f10 |     |shift│ alt │╳╳╳╳╳│     │╳╳╳╳╳│     │
 fn   └──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┐  │
  │      │     │ f11 │ f12 │     │     │     │     │     │     │     │     │     │  │
  │      └────┬┴────┬┴─────┼─────┴─────┴─────┴─────┴─────┼─────┴┬────┴┬────┴─────┘  │
  │           │     │      │                             │      │     │             │
  ╰           └─────┴──────┴─────────────────────────────┴──────┴─────┘             ╯
```

## Design

### Constraints

1. Can be implemented on a standard keyboard (in particular, on both my HHKB and my MacBook).
2. Never requires moving any finger more than one key away from the home position.
3. Only uses common or garden layers -- no mod-tap, one-shot, or chords.

The 36 keys immediately surrounding the home position, the space bar, and two modifier keys on
either side of the space bar provide a good common set of 41 keys to work with. They don't vary much
between otherwise different physical layouts and give us plenty of keys once we've introduced a few
layers.

### `base`

Largely the same as standard, but with

- `nav` where caps lock (or ctrl on some keyboards) would normally be.
- `num` where quote would normally be, quote where open bracket would normally be, and open bracket
  relegated to `nav`.
- Right control where right command would normally be -- the rest of the layout is designed with the
  assumption that we'll always hit command with our left thumb, and control with our right thumb, so
  we only need one of each.

### `nav`

The `nav` layer is accessed by holding the `nav` key with the left hand. Shift and alt are
accessible by the fingers of the left hand for modifier + arrow key combinations. `prev`, `next`,
`back`, and `fwd` are convenience shortcuts for moving to the previous or next tab, and back or
forward in history, accessible with one hand.

### `num` and `fn`

The `num` layer is accessed by holding the `num` key with the right hand. Shift and alt are
accessible by the fingers of the right hand for modifier + number key combinations. Additionally
holding the `fn` key with the right hand reveals the `fn` layer, replacing the number keys with
their corresponding function keys.

## Installation

[karabiner.js][] provides an implementation for [Karabiner-Elements][]. Either copy and paste in to
"Complex Modifications" > "Add your own rule using JavaScript" or run `jog build` after installing
[jog][] and [jsq][].

> [!WARNING]
> `jog build` will **replace** your `karabiner.json` so avoid if you're using Karabiner for anything
> else.

[karabiner.js]: ./karabiner.js
[Karabiner-Elements]: https://karabiner-elements.pqrs.org/
[jog]: https://github.com/callum-oakley/jog
[jsq]: https://github.com/callum-oakley/jsq
