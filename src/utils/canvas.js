/* eslint-disable */
export function canvasAnimation() {
  var a = canvas;
  var b = document.body;
  var c = a.getContext('2d');
  var g = a.getContext('3d');
  var d = document.createElement('canvas');
  var e = d.getContext('2d');
  var size = 1024,
    M = Math,
    sc = 1,
    scaleTarget = 1,
    beginWarp = 1,
    parts = [],
    dead = [];
  d.width = d.height = size * 2;
  var r = v => ~~(M.random() * v);
  var create = (parent, d, mod) => {
    var p;
    var x = parent ? parent.x : size;
    var y = parent ? parent.y : size;
    mod = mod || 1;
    var o = !parent;
    var hue = parent ?
      parent.hue + r(40) - 20 :
      160 + r(70);
    var colour = 'hsl(' + hue + ',99%,' + mod * 60 + '%)';
    if (parent && dead[0]) {
      p = dead.splice(-1)[0];
      p.d = d;
      p.x = x;
      p.y = y;
      p.o = 0;
      p.pos = 0;
      p.alive = 3;
      p.colour = colour;
      p.P = [x, y];
    } else {
      p = {
        P: [x, y],
        pos: 0,
        alive: 3,
        x,
        y,
        o,
        d: d || r(3) * 2,
        mod,
        s: 8 * mod,
        fade: .9 + r(9) * .01,
        hue,
        colour,
        kill: () => {
          p.alive = 0;
          dead.push(p);
        },
        m: () => {
          if (p.alive == 0) {
            return;
          }
          if (!p.o) p.alive *= p.fade;
          if (p.alive < 1 / size) {
            p.kill();
            return;
          }
          p.pos += 1 / 8;
          if (p.pos == 1) {

            if (p.x < 0 || p.x > size * 2 || p.y < 0 || p.y > size * 2) {
              if (p.o) {
                if (canvasdra) {
                  create();
                }

              } else {
                p.kill();
              }
              return;
            }
            p.pos = 0;
            p.d += r(2) * 2 - 1;
            if (p.mod > 1 / 4 && r(9) > 7) {

              for (var i = r(6); i--;) {
                var newDir = p.d + r(2) * 4 - 2;
                if (canvasdra) {
                  create(p, newDir, p.mod / 2);
                }
              }
            }
          } else {
            p.x += M.sin(p.d * M.PI / 3) * p.s;
            p.y += M.cos(p.d * M.PI / 3) * p.s;

            p.P.unshift(p.x, p.y);
            p.P.splice(6);


            e.lineWidth = p.mod * 6;
            e.strokeStyle = p.colour;
            e.beginPath();
            e.moveTo(p.P[0], p.P[1]);
            e.lineTo(p.P[2], p.P[3]);
            e.lineTo(p.P[4], p.P[5]);
            e.stroke();

          }

        }
      };
      parts.push(p);
    }
  };
  var render = (t) => {
    requestAnimationFrame(render);
    if ((0 | (t / size)) % 5 == 0) {
      if (!beginWarp) {
        beginWarp = 1;

        scaleTarget = M.random() / 2 + .7;
      }
    } else {
      beginWarp = 0;
    }
    sc -= (sc - scaleTarget) / 20;
    c.save();
    c.translate(size / 2, size / 2);
    c.scale(sc, sc);
    c.rotate(t * .0001);
    c.translate(-size, -size);
    e.fillStyle = 'rgba(0,0,0,.02)';
    e.fillRect(0, 0, size * 2, size * 2);
    for (var i = parts.length; i--;) parts[i].m();
    if (canvasdra) {
      c.drawImage(d, 0, 0);
      c.restore();
    }
  };
  while (sc -= 1 / 8) {
    if (canvasdra) {
      create();
    } else {

    }
  };
  render(1);
}

