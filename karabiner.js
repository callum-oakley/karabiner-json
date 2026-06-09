// default
// ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
// │ esc │  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │  0  │  -  │  =  │ nop │ nop │
// ├─────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴─────┤
// │  tab   │  q  │  w  │  e  │  r  │  t  │  y  │  u  │  i  │  o  │  p  │  [  │  ]  │  nop   │
// ├────────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴────────┤
// │ extend  │  a  │  s  │  d  │  f  │  g  │  h  │  j  │  k  │  l  │  ;  │  '  │     nop     │
// ├─────────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴───────┬─────┤
// │   shift    │  z  │  x  │  c  │  v  │  b  │  n  │  m  │  ,  │  .  │  /  │  shift   │ nop │
// └─────────┬──┴──┬──┴────┬┴─────┴─────┴─────┴─────┴─────┴────┬┴─────┴┬────┴┬─────────┴─────┘
//           │ opt │  cmd  │               space               │ ctrl  │ opt │
//           └─────┴───────┴───────────────────────────────────┴───────┴─────┘
//
// extend
// ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
// │     │ f1  │ f2  │ f3  │ f4  │ f5  │ f6  │ f7  │ f8  │ f9  │ f10 │ f11 │ f12 │     │     │
// ├─────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴─────┤
// │        │     │caps │bri- │bri+ │     │     │ bsp │ up  │ del │     │     │     │        │
// ├────────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴────────┤
// │ XXXXXXX │     │play │vol- │vol+ │     │     │left │down │right│  |  │     │             │
// ├─────────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴───────┬─────┤
// │            │     │     │     │     │     │     │     │  `  │  ~  │  \  │          │     │
// └─────────┬──┴──┬──┴────┬┴─────┴─────┴─────┴─────┴─────┴────┬┴─────┴┬────┴┬─────────┴─────┘
//           │     │       │              return               │       │     │
//           └─────┴───────┴───────────────────────────────────┴───────┴─────┘

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

({
  description: "Callum's keymap",
  manipulators: [
    // We're going to map left_control to extend, so map right_command to right_control.
    map("right_command", "right_control"),

    // Extend layer triggered by caps_lock for Macbooks or left_control for HHKBs.
    map("caps_lock", { layer: "extend" }),
    map("left_control", { layer: "extend" }),

    // Arrow keys.
    map("i", "up_arrow", { layer: "extend" }),
    map("j", "left_arrow", { layer: "extend" }),
    map("k", "down_arrow", { layer: "extend" }),
    map("l", "right_arrow", { layer: "extend" }),

    // Backspace, delete, and return.
    map("u", "delete_or_backspace", { layer: "extend" }),
    map("o", "delete_forward", { layer: "extend" }),
    map("spacebar", "return_or_enter", { layer: "extend" }),

    // Backslash, backtick, pipe, and tilde.
    map("semicolon", ["shift", "backslash"], { layer: "extend" }),
    map("comma", "grave_accent_and_tilde", { layer: "extend" }),
    map("period", ["shift", "grave_accent_and_tilde"], { layer: "extend" }),
    map("slash", "backslash", { layer: "extend" }),

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

    // Caps lock, brightness, media keys.
    map("w", "caps_lock", { layer: "extend" }),
    map("e", "display_brightness_decrement", { layer: "extend" }),
    map("r", "display_brightness_increment", { layer: "extend" }),
    map("s", "play_or_pause", { layer: "extend" }),
    map("d", "volume_decrement", { layer: "extend" }),
    map("f", "volume_increment", { layer: "extend" }),

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
