import initKaplay from "./kaplayCtx";

export default function initGame() {
  const k = initKaplay();

  k.loadSprite("background", "./background.png");
  k.loadSprite("characters", "./characters.png", {
    sliceY: 2,
    sliceX: 8,
    anims: {
      "down-idle": 0,
      "up-idle": 1,
      "right-idle": 2,
      "left-idle": 3,
      right: { from: 4, to: 5, loop: true },
      left: { from: 6, to: 7, loop: true },
      down: { from: 8, to: 9, loop: true },
      up: { from: 10, to: 11, loop: true },
      "npc-down": 12,
      "npc-up": 13,
      "npc-right": 14,
      "npc-left": 15,
    },
  });

  k.add([k.sprite("background"), k.pos(0, -70), k.scale(8)]);

  const player = k.add([
    k.sprite("characters", { anim: "down-idle" }),
    k.area(),
    k.body(),
    k.anchor("center"),
    k.scale(8),
    "player",
    {
      speed: 880,
      direction: k.vec2(0, 0),
    },
  ]);

  player.onUpdate(() => {
    player.direction.x = 0;
    player.direction.y = 0;

    if (k.isKeyDown("left")) player.direction.x = -1;
    if (k.isKeyDown("right")) player.direction.x = 1;
    if (k.isKeyDown("up")) player.direction.y = -1;
    if (k.isKeyDown("down")) player.direction.y = 1;

    if (
      player.direction.eq(k.vec2(-1, 0)) &&
      player.getCurAnim().name !== "left"
    ) {
      player.play("left");
    }
  });
}
