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
// │ raise  │  q  │  w  │  e  │  r  │  t  │  y  │  u  │  i  │  o  │  p  │ tab │     │        │
// ├────────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴────────┤
// │  lower  │  a  │  s  │  d  │  f  │  g  │  h  │  j  │  k  │  l  │  ;  │  '  │             │
// ├─────────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴───────┬─────┤
// │   shift    │  z  │  x  │  c  │  v  │  b  │  n  │  m  │  ,  │  .  │  /  │  shift   │     │
// └─────────┬──┴──┬──┴────┬┴─────┴─────┴─────┴─────┴─────┴────┬┴─────┴┬────┴┬─────────┴─────┘
//           │ alt │  cmd  │               space               │ ctrl  │ alt │
//           └─────┴───────┴───────────────────────────────────┴───────┴─────┘
//
// raise
// ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
// │     │     │     │     │     │     │     │     │     │     │     │     │     │     │     │
// ├─────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴─────┤
// │ XXXXXX │     │     │     │     │     │     │  1  │  2  │  3  │  4  │     │     │        │
// ├────────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴────────┤
// │         │     │ fn  │ alt │shift│     |     |  5  │  6  │  7  │  8  │     │             │
// ├─────────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴───────┬─────┤
// │            │     │     │     │     │     │     │  9  │  0  │  -  │  =  │          │     │
// └─────────┬──┴──┬──┴────┬┴─────┴─────┴─────┴─────┴─────┴────┬┴─────┴┬────┴┬─────────┴─────┘
//           │     │       │                                   │       │     │
//           └─────┴───────┴───────────────────────────────────┴───────┴─────┘
//
// raise + fn
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
//
// lower
// ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
// │     │     │     │     │     │     │     │     │     │     │     │     │     │     │     │
// ├─────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴─────┤
// │        │     │     │     │     │     │     │ bsp │ up  │ del │ esc │     │     │        │
// ├────────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴────────┤
// │ XXXXXXX │     │ fn  │ alt │shift│     |     |left │down │right│enter│  `  │             │
// ├─────────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴───────┬─────┤
// │            │     │     │     │     │     │     │     │  [  │  ]  │  \  │          │     │
// └─────────┬──┴──┬──┴────┬┴─────┴─────┴─────┴─────┴─────┴────┬┴─────┴┬────┴┬─────────┴─────┘
//           │     │       │                                   │       │     │
//           └─────┴───────┴───────────────────────────────────┴───────┴─────┘
//
// lower + fn
// ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
// │     │     │     │     │     │     │     │     │     │     │     │     │     │     │     │
// ├─────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴─────┤
// │        │     │     │     │     │     │     │     │vol+ │bri+ │     │     │     │        │
// ├────────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴────────┤
// │ XXXXXXX │     │ XXX │ alt │shift│     |     |     │vol- │bri- │caps │     │             │
// ├─────────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴───────┬─────┤
// │            │     │     │     │     │     │     │     │     │     │     │          │     │
// └─────────┬──┴──┬──┴────┬┴─────┴─────┴─────┴─────┴─────┴────┬┴─────┴┬────┴┬─────────┴─────┘
//           │     │       │                                   │       │     │
//           └─────┴───────┴───────────────────────────────────┴───────┴─────┘
({
  description: "Callum's keymap",
  manipulators: [
    // We're going to map left_control to extend, so map right_command to right_control.
    map("right_command", "right_control"),

    // Extend layer triggered by caps_lock for Macbooks or left_control for HHKBs.
    map("caps_lock", { layer: "extend" }),
    map("left_control", { layer: "extend" }),

    // Function keys.
    map("1", "f1", { layer: "extend" }),
    map("2", "f2", { layer: "extend" }),
    map("3", "f3", { layer: "extend" }),
    map("4", "f4", { layer: "extend" }),
    map("5", "f5", { layer: "extend" }),
    map("6", "f6", { layer: "extend" }),
    map("7", "f7", { layer: "extend" }),
    map("8", "f8", { layer: "extend" }),
    map("9", "f9", { layer: "extend" }),
    map("0", "f10", { layer: "extend" }),
    map("hyphen", "f11", { layer: "extend" }),
    map("equal_sign", "f12", { layer: "extend" }),

    // Left hand
    map("w", "play_or_pause", { layer: "extend" }),
    map("e", "volume_decrement", { layer: "extend" }),
    map("r", "volume_increment", { layer: "extend" }),
    map("s", "left_shift", { layer: "extend" }),
    map("d", "left_option", { layer: "extend" }),
    map("f", "left_control", { layer: "extend" }),
    map("x", "caps_lock", { layer: "extend" }),
    map("c", "display_brightness_decrement", { layer: "extend" }),
    map("v", "display_brightness_increment", { layer: "extend" }),

    // Right hand

    // Arrow keys.
    map("i", "up_arrow", { layer: "extend" }),
    map("j", "left_arrow", { layer: "extend" }),
    map("k", "down_arrow", { layer: "extend" }),
    map("l", "right_arrow", { layer: "extend" }),

    // Backspace, delete, and return.
    map("u", "delete_or_backspace", { layer: "extend" }),
    map("o", "delete_forward", { layer: "extend" }),
    map("spacebar", "return_or_enter", { layer: "extend" }),

    // Backslash, pipe, backtick, and tilde.
    map("slash", "backslash", { layer: "extend" }),
    map("semicolon", ["shift", "backslash"], { layer: "extend" }),
    map("quote", "grave_accent_and_tilde", { layer: "extend" }),
    map("h", ["shift", "grave_accent_and_tilde"], { layer: "extend" }),

    // Map silly Macbook keys to the keys that should be there instead.
    map("grave_accent_and_tilde", "escape", { device: HOME_MACBOOK }),
    map("grave_accent_and_tilde", "left_shift", { device: WORK_MACBOOK }),
    map("non_us_backslash", "escape", { device: WORK_MACBOOK }),

    // Unmap redundant keys.
    map("up_arrow"),
    map("left_arrow"),
    map("down_arrow"),
    map("right_arrow"),
    map("delete_or_backspace"),
    map("return_or_enter"),
    map("backslash"),
    map("grave_accent_and_tilde"),
    map("f1"),
    map("f2"),
    map("f3"),
    map("f4"),
    map("f5"),
    map("f6"),
    map("f7"),
    map("f8"),
    map("f9"),
    map("f10"),
    map("f11"),
    map("f12"),
  ],
});
