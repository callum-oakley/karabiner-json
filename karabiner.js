// Location IDs from Karabiner-EventViewer
const HOME_MACBOOK = 41;
const WORK_MACBOOK = 45;

function map(from, to, opts) {
  const manipulator = {
    type: "basic",
    from: {
      key_code: from,
      modifiers: { optional: ["any"] },
    },
  };

  if (typeof to === "string") {
    manipulator.to = [{
      key_code: to,
    }];
  } else if (Array.isArray(to)) {
    manipulator.to = [{
      modifiers: to.slice(0, -1),
      key_code: to[to.length - 1],
    }];
  } else if (to && to.layer) {
    manipulator.to = [{
      set_variable: { name: to.layer, value: true, key_up_value: false },
    }];
  }

  if (opts && opts.layer) {
    if (!manipulator.conditions) {
      manipulator.conditions = [];
    }
    manipulator.conditions.push({
      type: "variable_if",
      name: opts.layer,
      value: true,
    });
  }

  if (opts && opts.device) {
    if (!manipulator.conditions) {
      manipulator.conditions = [];
    }
    manipulator.conditions.push({
      type: "device_if",
      identifiers: [{ location_id: opts.device }],
    });
  }

  return manipulator;
}

// default
// ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
// │     │     │     │     │     │     │     │     │     │     │     │     │     │     │     │
// ├─────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴─────┤
// │  num   │  q  │  w  │  e  │  r  │  t  │  y  │  u  │  i  │  o  │  p  │ tab │     │        │
// ├────────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴────────┤
// │   nav   │  a  │  s  │  d  │  f  │  g  │  h  │  j  │  k  │  l  │  ;  │  '  │             │
// ├─────────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴───────┬─────┤
// │   shift    │  z  │  x  │  c  │  v  │  b  │  n  │  m  │  ,  │  .  │  /  │  shift   │     │
// └─────────┬──┴──┬──┴────┬┴─────┴─────┴─────┴─────┴─────┴────┬┴─────┴┬────┴┬─────────┴─────┘
//           │ alt │  cmd  │               space               │ ctrl  │ alt │
//           └─────┴───────┴───────────────────────────────────┴───────┴─────┘
//
// num
// ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
// │     │     │     │     │     │     │     │     │     │     │     │     │     │     │     │
// ├─────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴─────┤
// │ XXXXXX │     │     │     │     │     │bri+ │  1  │  2  │  3  │  4  │     │     │        │
// ├────────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴────────┤
// │         │     │ fn  │ alt │shift│     |bri- |  5  │  6  │  7  │  8  │     │             │
// ├─────────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴───────┬─────┤
// │            │     │     │     │     │     │     │  9  │  0  │  -  │  =  │          │     │
// └─────────┬──┴──┬──┴────┬┴─────┴─────┴─────┴─────┴─────┴────┬┴─────┴┬────┴┬─────────┴─────┘
//           │     │       │                                   │       │     │
//           └─────┴───────┴───────────────────────────────────┴───────┴─────┘
//
// nav
// ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
// │     │     │     │     │     │     │     │     │     │     │     │     │     │     │     │
// ├─────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴─────┤
// │        │     │     │     │     │     │vol+ │ bsp │ up  │ del │ esc │     │     │        │
// ├────────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴────────┤
// │ XXXXXXX │     │caps │ alt │shift│     |vol- |left │down │right│enter│  `  │             │
// ├─────────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴───────┬─────┤
// │            │     │     │     │     │     │play │  [  │  ]  │     │  \  │          │     │
// └─────────┬──┴──┬──┴────┬┴─────┴─────┴─────┴─────┴─────┴────┬┴─────┴┬────┴┬─────────┴─────┘
//           │     │       │                                   │       │     │
//           └─────┴───────┴───────────────────────────────────┴───────┴─────┘
//
// fn
// ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
// │     │     │     │     │     │     │     │     │     │     │     │     │     │     │     │
// ├─────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴─────┤
// │ XXXXXX │     │     │     │     │     │     │ f1  │ f2  │ f3  │ f4  │     │     │        │
// ├────────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴────────┤
// │         │     │ XXX │ alt │shift│     |     | f5  │ f6  │ f7  │ f8  │     │             │
// ├─────────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴───────┬─────┤
// │            │     │     │     │     │     │     │ f9  │ f10 │ f11 │ f12 │          │     │
// └─────────┬──┴──┬──┴────┬┴─────┴─────┴─────┴─────┴─────┴────┬┴─────┴┬────┴┬─────────┴─────┘
//           │     │       │                                   │       │     │
//           └─────┴───────┴───────────────────────────────────┴───────┴─────┘
({
  description: "Callum's keymap",
  // Layers ordered from "highest" to "lowest" because the first match applies.
  manipulators: [
    // fn
    map("d", "left_option", { layer: "fn" }),
    map("f", "left_shift", { layer: "fn" }),
    map("u", "f1", { layer: "fn" }),
    map("i", "f2", { layer: "fn" }),
    map("o", "f3", { layer: "fn" }),
    map("p", "f4", { layer: "fn" }),
    map("j", "f5", { layer: "fn" }),
    map("k", "f6", { layer: "fn" }),
    map("l", "f7", { layer: "fn" }),
    map("semicolon", "f8", { layer: "fn" }),
    map("m", "f9", { layer: "fn" }),
    map("comma", "f10", { layer: "fn" }),
    map("period", "f11", { layer: "fn" }),
    map("slash", "f12", { layer: "fn" }),

    // nav
    map("s", "caps_lock", { layer: "nav" }),
    map("d", "left_option", { layer: "nav" }),
    map("f", "left_shift", { layer: "nav" }),
    map("u", "delete_or_backspace", { layer: "nav" }),
    map("i", "up_arrow", { layer: "nav" }),
    map("o", "delete_forward", { layer: "nav" }),
    map("p", "escape", { layer: "nav" }),
    map("j", "left_arrow", { layer: "nav" }),
    map("k", "down_arrow", { layer: "nav" }),
    map("l", "right_arrow", { layer: "nav" }),
    map("semicolon", "return_or_enter", { layer: "nav" }),
    map("quote", "grave_accent_and_tilde", { layer: "nav" }),
    map("m", "open_bracket", { layer: "nav" }),
    map("comma", "close_bracket", { layer: "nav" }),
    map("slash", "backslash", { layer: "nav" }),
    map("y", "volume_increment", { layer: "nav" }),
    map("h", "volume_decrement", { layer: "nav" }),
    map("n", "play_or_pause", { layer: "nav" }),

    // num
    map("s", { layer: "fn" }, { layer: "num" }),
    map("d", "left_option", { layer: "num" }),
    map("f", "left_shift", { layer: "num" }),
    map("u", "1", { layer: "num" }),
    map("i", "2", { layer: "num" }),
    map("o", "3", { layer: "num" }),
    map("p", "4", { layer: "num" }),
    map("j", "5", { layer: "num" }),
    map("k", "6", { layer: "num" }),
    map("l", "7", { layer: "num" }),
    map("semicolon", "8", { layer: "num" }),
    map("m", "9", { layer: "num" }),
    map("comma", "0", { layer: "num" }),
    map("period", "hyphen", { layer: "num" }),
    map("slash", "equal_sign", { layer: "num" }),
    map("y", "display_brightness_increment", { layer: "num" }),
    map("h", "display_brightness_decrement", { layer: "num" }),

    // default
    map("tab", { layer: "num" }),
    map("caps_lock", { layer: "nav" }),
    map("left_control", { layer: "nav" }),
    map("open_bracket", "tab"),
    map("right_command", "right_control"),
  ],
});
