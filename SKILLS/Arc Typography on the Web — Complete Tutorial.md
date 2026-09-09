# Arc Typography on the Web

A complete guide to creating **curved / arched typography** in HTML, CSS, SVG, and React/Next.js.

This tutorial focuses on creating the kind of typography you might create with Photoshop's:

> **Warp Text → Arc**

but in a web page.

---

# 1. What Are We Trying to Create?

Normal HTML text looks like this:

```text
HELLO WORLD
```

We want something like:

```text
        H E L L O
      W O R L D
```

More precisely, the baseline of the text follows a curve:

```text
              HELLO
          ___/     \___
```

For a stronger curve:

```text
          H E L L O
       /             \
     /                 \
```

Or we can create a downward arc:

```text
     \                 /
       \             /
          H E L L O
```

There are several ways to achieve this.

---

# 2. The Three Main Techniques

There are three common approaches.

## Technique 1 — Rotate Individual Letters

We can put every character inside its own `<span>` and rotate each letter.

Example:

```html
<div class="arc">
  <span>H</span>
  <span>E</span>
  <span>L</span>
  <span>L</span>
  <span>O</span>
</div>
```

Then:

```css
.arc span:nth-child(1) {
  transform: rotate(-20deg);
}

.arc span:nth-child(2) {
  transform: rotate(-10deg);
}

.arc span:nth-child(3) {
  transform: rotate(0deg);
}

.arc span:nth-child(4) {
  transform: rotate(10deg);
}

.arc span:nth-child(5) {
  transform: rotate(20deg);
}
```

### Advantages

Very easy to understand.

You get direct control over every letter.

### Disadvantages

You have to calculate the positions manually.

Long words become difficult.

Responsive layouts become harder.

This is useful for:

- Logos
- Very short words
- Decorative typography
- Hand-made layouts

---

# 3. Technique 2 — CSS Transforms

CSS can also be used to move and rotate letters dynamically.

For example:

```html
<div class="word">
  <span>H</span>
  <span>E</span>
  <span>L</span>
  <span>L</span>
  <span>O</span>
</div>
```

Then JavaScript can calculate the rotation.

Conceptually:

```text
letter 1 → -25°
letter 2 → -12°
letter 3 →   0°
letter 4 →  12°
letter 5 →  25°
```

This is more flexible than hardcoding CSS selectors.

But there is still a fundamental problem:

You are approximating a curve using individually transformed letters.

---

# 4. Technique 3 — SVG Text on a Path

This is usually the best solution for web arc typography.

SVG allows us to define a mathematical path and tell the browser:

> Put this text along that path.

The basic structure is:

```html
<svg>
  <defs>

    <path
      id="arc"
      d="M 100 200 Q 400 0 700 200"
    />

  </defs>

  <text>

    <textPath href="#arc">
      HELLO
    </textPath>

  </text>

</svg>
```

This is the technique we will focus on.

---

# 5. Understanding SVG

SVG stands for:

**Scalable Vector Graphics**

It is built directly into HTML.

You can write:

```html
<svg>
</svg>
```

inside your page.

Unlike a PNG or JPG, SVG is vector-based.

That means it remains sharp when scaled.

This is especially useful for large typography.

---

# 6. Creating a Basic SVG

Start with:

```html
<svg
  width="800"
  height="400"
  viewBox="0 0 800 400"
>
</svg>
```

The important part is:

```html
viewBox="0 0 800 400"
```

This creates an internal coordinate system.

Think of it as:

```text
0 ------------------------------ 800
|
|
|
|
400
```

---

# 7. Creating a Path

Now create a path:

```html
<path
  d="M 100 300 Q 400 50 700 300"
  fill="none"
/>
```

Let's break this apart.

## `M`

`M` means:

> Move to this position.

```text
M 100 300
```

means:

```text
Start at x=100
Start at y=300
```

---

# 8. The `Q` Command

This is a quadratic Bézier curve.

```text
Q controlPointX controlPointY endPointX endPointY
```

Our example:

```html
Q 400 50 700 300
```

means:

```text
Start
  ↓

(100,300)

       control point
           ↓
         (400,50)

                     End
                      ↓
                   (700,300)
```

The resulting curve looks roughly like:

```text
             •
          /     \
       /           \
    •                 •
```

This is the foundation of our arc typography.

---

# 9. Creating Text on the Path

Now add:

```html
<text>
  <textPath href="#arc">
    HELLO
  </textPath>
</text>
```

But first, the path must have an ID.

```html
<path
  id="arc"
  d="M 100 300 Q 400 50 700 300"
  fill="none"
/>
```

Then:

```html
<text>
  <textPath href="#arc">
    HELLO
  </textPath>
</text>
```

The important relationship is:

```text
             SVG PATH
                 ↓
      ─────────────────────
                 ↑
                 │
             textPath
                 ↑
                 │
               HELLO
```

`textPath` references the path using:

```html
href="#arc"
```

---

# 10. Centering the Text

Usually we want the text in the center of the arc.

Use:

```html
startOffset="50%"
```

and:

```html
text-anchor="middle"
```

Example:

```html
<text
  text-anchor="middle"
>
  <textPath
    href="#arc"
    startOffset="50%"
  >
    HELLO
  </textPath>
</text>
```

Now the center of the word sits at the center of the curve.

---

# 11. Complete Minimal Example

Here is the smallest useful arc typography implementation:

```html
<!DOCTYPE html>

<html>

<head>

  <meta charset="UTF-8">

  <style>

    svg {
      width: 800px;
      height: 400px;
    }

    text {
      font-family: Arial, sans-serif;
      font-size: 100px;
      font-weight: 900;
      fill: red;
    }

  </style>

</head>

<body>

  <svg
    viewBox="0 0 800 400"
  >

    <defs>

      <path
        id="arc"
        d="M 100 300 Q 400 50 700 300"
        fill="none"
      />

    </defs>

    <text
      text-anchor="middle"
    >

      <textPath
        href="#arc"
        startOffset="50%"
      >

        HELLO

      </textPath>

    </text>

  </svg>

</body>

</html>
```

That's already a working curved text system.

---

# 12. Changing the Arc Strength

The most important part of the system is the path.

We currently have:

```svg
M 100 300 Q 400 50 700 300
```

The control point is:

```text
400 50
```

The `Y` value determines how high the curve rises.

---

## Weak Arc

```svg
M 100 300 Q 400 180 700 300
```

Result:

```text
      HELLO
   __________
```

---

## Medium Arc

```svg
M 100 300 Q 400 100 700 300
```

Result:

```text
        HELLO
     _________
```

---

## Strong Arc

```svg
M 100 300 Q 400 -20 700 300
```

Result:

```text
          HELLO
       /         \
```

---

# 13. Making the Arc Dynamic

Now we can control the path using JavaScript.

Suppose we have:

```html
<input
  id="arc"
  type="range"
  min="-200"
  max="300"
  value="100"
>
```

Then:

```javascript
const arcSlider =
  document.getElementById("arc");

const path =
  document.getElementById("arc");
```

We can update the path:

```javascript
arcSlider.addEventListener(
  "input",
  () => {

    const value =
      Number(arcSlider.value);

    path.setAttribute(
      "d",
      `M 100 300 Q 400 ${value} 700 300`
    );

  }
);
```

Now the user can drag a slider and change the curvature.

---

# 14. The Complete Interactive Demo

Here is a complete version:

```html
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Arc Typography</title>

  <style>

    * {
      box-sizing: border-box;
    }

    body {

      margin: 0;

      min-height: 100vh;

      display: flex;

      align-items: center;

      justify-content: center;

      background: #f4f0e8;

      font-family: Arial, sans-serif;

    }

    .container {

      width: min(1000px, 95vw);

    }

    .preview {

      background: white;

      border-radius: 24px;

      padding: 30px;

      box-shadow:
        0 20px 60px
        rgba(0,0,0,.1);

    }

    svg {

      width: 100%;

      height: auto;

      overflow: visible;

    }

    #arcText {

      font-family:
        Arial,
        sans-serif;

      font-weight: 900;

      font-size: 100px;

      fill: #ff3b30;

      stroke: #111;

      stroke-width: 5px;

      paint-order:
        stroke fill;

    }

    .controls {

      margin-top: 20px;

      display: grid;

      gap: 15px;

      background: white;

      padding: 20px;

      border-radius: 20px;

    }

    input {

      width: 100%;

    }

  </style>

</head>

<body>

<div class="container">

  <div class="preview">

    <svg
      viewBox="0 0 1000 500"
    >

      <defs>

        <path
          id="arcPath"
          d="M 100 350
             Q 500 100
               900 350"
          fill="none"
        />

      </defs>

      <text
        id="arcText"
        text-anchor="middle"
      >

        <textPath
          id="textPath"
          href="#arcPath"
          startOffset="50%"
        >
          HELLO!
        </textPath>

      </text>

    </svg>

  </div>


  <div class="controls">

    <label>

      Text

      <input
        id="textInput"
        type="text"
        value="HELLO!"
      >

    </label>


    <label>

      Arc

      <input
        id="arcSlider"
        type="range"
        min="-200"
        max="400"
        value="100"
      >

    </label>


    <label>

      Font Size

      <input
        id="fontSize"
        type="range"
        min="20"
        max="200"
        value="100"
      >

    </label>


    <label>

      Letter Spacing

      <input
        id="letterSpacing"
        type="range"
        min="-10"
        max="30"
        value="0"
      >

    </label>

  </div>

</div>


<script>

  const textInput =
    document.getElementById(
      "textInput"
    );

  const textPath =
    document.getElementById(
      "textPath"
    );

  const arcSlider =
    document.getElementById(
      "arcSlider"
    );

  const fontSize =
    document.getElementById(
      "fontSize"
    );

  const letterSpacing =
    document.getElementById(
      "letterSpacing"
    );

  const arcText =
    document.getElementById(
      "arcText"
    );

  const arcPath =
    document.getElementById(
      "arcPath"
    );


  /*
  -------------------------------
  TEXT
  -------------------------------
  */

  textInput.addEventListener(
    "input",
    () => {

      textPath.textContent =
        textInput.value;

    }
  );


  /*
  -------------------------------
  ARC
  -------------------------------
  */

  arcSlider.addEventListener(
    "input",
    () => {

      const value =
        Number(
          arcSlider.value
        );

      arcPath.setAttribute(
        "d",
        `M 100 350
         Q 500 ${value}
           900 350`
      );

    }
  );


  /*
  -------------------------------
  FONT SIZE
  -------------------------------
  */

  fontSize.addEventListener(
    "input",
    () => {

      arcText.style.fontSize =
        `${fontSize.value}px`;

    }
  );


  /*
  -------------------------------
  LETTER SPACING
  -------------------------------
  */

  letterSpacing.addEventListener(
    "input",
    () => {

      arcText.style.letterSpacing =
        `${letterSpacing.value}px`;

    }
  );

</script>

</body>

</html>
```

---

# 15. Adding a Playful Font

For a kids magazine, a normal Arial font isn't particularly interesting.

You can use Google Fonts.

For example:

```html
<link
  rel="preconnect"
  href="https://fonts.googleapis.com"
>

<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossorigin
>

<link
  href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
>
```

Then:

```css
#arcText {

  font-family:
    "Baloo 2",
    sans-serif;

  font-weight: 800;

}
```

Other rounded/playful fonts can be used in exactly the same way.

---

# 16. Adding a Thick Cartoon Outline

This is especially useful for children's typography.

Use:

```css
#arcText {

  fill: #ff3b30;

  stroke: #111;

  stroke-width: 6px;

  paint-order:
    stroke fill;

}
```

The result becomes visually closer to:

```text
        HELLO!
```

with a thick illustrated outline.

The important property is:

```css
paint-order:
  stroke fill;
```

Without it, the stroke can visually cover parts of the fill.

---

# 17. Adding a Shadow

SVG also allows filters.

Add:

```html
<filter id="shadow">

  <feDropShadow
    dx="0"
    dy="8"
    stdDeviation="3"
    flood-opacity="0.25"
  />

</filter>
```

Then:

```html
<text
  id="arcText"
  filter="url(#shadow)"
>
```

This gives the typography depth.

---

# 18. Making the Text Look Like a Sticker

Combine:

```css
#arcText {

  fill: #ff3b30;

  stroke: white;

  stroke-width: 16px;

  paint-order:
    stroke fill;

}
```

Then add another outer stroke if desired.

For a children's magazine, you can create a visual hierarchy such as:

```text
       ★  DISCOVER!  ★
     ┌─────────────────┐
```

with:

- colorful fill
- white sticker border
- black outer outline
- subtle shadow

---

# 19. Upward Arc vs Downward Arc

There are two major visual styles.

## Upward arch

The middle of the text rises.

```text
          HELLO
       /         \
     /             \
```

Use:

```svg
M 100 350
Q 500 50
  900 350
```

---

## Downward arch

The middle falls.

```text
     \             /
       \         /
         HELLO
```

Use:

```svg
M 100 100
Q 500 350
  900 100
```

The only thing that changed is the control point.

---

# 20. Making a Full Circle

SVG paths aren't limited to simple arcs.

You can create circular typography.

For example:

```svg
<path
  id="circle"
  d="
    M 500 100
    A 200 200
      0 1 1
      499 100
  "
  fill="none"
/>
```

Then:

```html
<text>

  <textPath href="#circle">

    WELCOME TO OUR MAGAZINE

  </textPath>

</text>
```

This can produce:

```text
        WELCOME TO
      /             \
     /               \
    |                 |
     \               /
      \_____________/
```

This is useful for badges, stickers, seals, and logos.

---

# 21. Important: SVG Text Is Not Photoshop Warp

This distinction matters.

Photoshop's Arc warp mathematically deforms the text.

SVG's:

```html
<textPath>
```

puts the text along a path.

For many designs, they look extremely similar.

But they are technically different.

### SVG textPath

Each glyph remains a normal glyph and follows the path.

### Photoshop Arc Warp

The entire text object can be geometrically distorted.

For most web UI work, SVG text paths are preferable because they are:

- scalable
- editable
- responsive
- accessible
- easy to animate
- easy to integrate into React

---

# 22. When SVG Isn't Enough

Sometimes you specifically want the entire word distorted, rather than following a baseline.

For example:

```text
Normal:

██████████
██████████


Warped:

    ███████
  ███████████
██████████████
```

This is closer to actual Photoshop Warp.

In this case, you have other options:

## CSS transforms

```css
transform:
  perspective(500px)
  rotateX(20deg);
```

## SVG transformations

You can manipulate individual glyphs.

## Canvas

You can draw each letter individually and transform it.

## WebGL

Useful for advanced animated typography.

For normal UI typography, however, this is usually unnecessary.

---

# 23. Creating a Reusable JavaScript Function

Instead of hardcoding one word, create a function:

```javascript
function createArcText({
  text,
  arc,
  fontSize,
  letterSpacing
}) {

  textPath.textContent = text;

  arcText.style.fontSize =
    `${fontSize}px`;

  arcText.style.letterSpacing =
    `${letterSpacing}px`;

  arcPath.setAttribute(
    "d",
    `M 100 350
     Q 500 ${arc}
       900 350`
  );

}
```

Now:

```javascript
createArcText({
  text: "WELCOME",
  arc: 100,
  fontSize: 120,
  letterSpacing: 2
});
```

Or:

```javascript
createArcText({
  text: "DISCOVER!",
  arc: 20,
  fontSize: 90,
  letterSpacing: 5
});
```

This is much more useful in an actual application.

---

# 24. Creating an Arc Typography React Component

In React, you can turn the idea into a component.

```tsx
type ArcTextProps = {
  text: string;
  fontSize?: number;
  arc?: number;
  letterSpacing?: number;
  color?: string;
  stroke?: string;
  strokeWidth?: number;
};
```

Then:

```tsx
export function ArcText({
  text,
  fontSize = 100,
  arc = 100,
  letterSpacing = 0,
  color = "#ff3b30",
  stroke = "#111",
  strokeWidth = 5
}: ArcTextProps) {

  const controlY =
    190 - arc;

  const path =
    `M 80 350
     Q 500 ${controlY}
       920 350`;

  return (

    <svg
      viewBox="0 0 1000 500"
      width="100%"
      height="auto"
    >

      <defs>

        <path
          id="arc-path"
          d={path}
          fill="none"
        />

      </defs>

      <text
        textAnchor="middle"
        style={{
          fontSize,
          letterSpacing,
          fill: color,
          stroke,
          strokeWidth,
          paintOrder:
            "stroke fill"
        }}
      >

        <textPath
          href="#arc-path"
          startOffset="50%"
        >

          {text}

        </textPath>

      </text>

    </svg>

  );
}
```

Then use:

```tsx
<ArcText
  text="HELLO!"
  fontSize={120}
  arc={100}
  color="#ff3b30"
  stroke="#111"
  strokeWidth={6}
/>
```

---

# 25. A Better Next.js Version

One thing to be careful about in React/Next.js is that multiple components might generate the same SVG ID.

For example:

```html
id="arc-path"
```

If you render:

```tsx
<ArcText text="HELLO" />

<ArcText text="WORLD" />
```

both components might reference:

```text
#arc-path
```

which can cause collisions.

A better solution is to generate a unique ID.

React provides:

```tsx
useId()
```

Example:

```tsx
import { useId } from "react";
```

Then:

```tsx
const id = useId();
```

And:

```tsx
<path
  id={`${id}-arc`}
/>
```

Then:

```tsx
<textPath
  href={`#${id}-arc`}
>
```

This makes the component reusable.

---

# 26. Production-Ready React Component

```tsx
"use client";

import { useId } from "react";

type ArcTextProps = {
  text: string;

  fontSize?: number;

  arc?: number;

  letterSpacing?: number;

  color?: string;

  stroke?: string;

  strokeWidth?: number;

  width?: number;

};

export function ArcText({
  text,

  fontSize = 100,

  arc = 100,

  letterSpacing = 0,

  color = "#ff3b30",

  stroke = "#111",

  strokeWidth = 5,

  width = 1000

}: ArcTextProps) {

  const id = useId();

  const pathId =
    `${id}-arc`;

  const controlY =
    190 - arc;

  const path =
    `M 80 350
     Q 500 ${controlY}
       920 350`;

  return (

    <svg
      viewBox="0 0 1000 500"
      width={width}
      height="auto"
      style={{
        overflow: "visible"
      }}
      role="img"
      aria-label={text}
    >

      <defs>

        <path
          id={pathId}
          d={path}
          fill="none"
        />

      </defs>

      <text

        textAnchor="middle"

        style={{

          fontSize:

            `${fontSize}px`,

          letterSpacing:

            `${letterSpacing}px`,

          fontWeight: 800,

          fill: color,

          stroke,

          strokeWidth,

          paintOrder:
            "stroke fill"

        }}

      >

        <textPath

          href={`#${pathId}`}

          startOffset="50%"

        >

          {text}

        </textPath>

      </text>

    </svg>

  );
}
```

---

# 27. Making It Responsive

SVG's `viewBox` is what makes this particularly convenient.

Use:

```html
<svg
  viewBox="0 0 1000 500"
  width="100%"
  height="auto"
>
```

Then CSS:

```css
svg {
  width: 100%;
  height: auto;
}
```

The browser can scale the entire design.

For example:

```text
Desktop

1000px
┌──────────────────────┐
│       HELLO!         │
└──────────────────────┘


Mobile

360px
┌─────────────┐
│   HELLO!    │
└─────────────┘
```

The SVG scales with the container.

---

# 28. A Common Problem: Long Words

Suppose you have:

```text
THIS IS A VERY LONG TITLE
```

The text might become too wide for the path.

Possible solutions:

### Increase the path length

```svg
M 20 350
Q 500 50
  980 350
```

### Reduce font size

### Reduce letter spacing

### Use a second line

### Increase the SVG width

---

# 29. A Better Dynamic Arc Algorithm

For production use, rather than simply changing the control point, you can derive the curve from an `arc` parameter.

For example:

```javascript
function updateArc(
  arcStrength
) {

  const centerX = 500;

  const baseY = 350;

  const controlY =
    baseY - arcStrength;

  const d = `
    M 80 ${baseY}
    Q ${centerX}
      ${controlY}
      920 ${baseY}
  `;

  arcPath.setAttribute(
    "d",
    d
  );

}
```

This gives you a simple API:

```javascript
updateArc(50);
```

or:

```javascript
updateArc(200);
```

---

# 30. Making the Typography More Playful

For a children's magazine, don't stop at simply curving the word.

You can combine several effects.

For example:

```css
.arc-text {

  font-family:
    "Baloo 2",
    sans-serif;

  font-weight: 800;

  fill: #ff3b30;

  stroke: white;

  stroke-width: 18px;

  paint-order:
    stroke fill;

  filter:
    drop-shadow(
      0 7px 0 rgba(0,0,0,.15)
    );

}
```

Then add another surrounding visual element:

```text
             ★
        WELCOME!
      ✦           ✦
```

This produces a much more editorial/kids-magazine aesthetic.

---

# 31. Multiple Colors

SVG can contain multiple text elements.

For example:

```html
<text>

  <textPath href="#arc">

    <tspan fill="#ff3b30">
      HELLO
    </tspan>

  </textPath>

</text>
```

You can also split the text into individual characters.

That allows designs such as:

```text
    H E L L O
    🔴 🟡 🔵 🟢 🟣
```

where every letter has a different color.

---

# 32. Rotating Individual Letters

Sometimes you want more of a hand-drawn feeling.

SVG can be combined with individual `<tspan>` elements.

Alternatively, React can render:

```tsx
{text.split("").map(
  (character, index) => (
    <span key={index}>
      {character}
    </span>
  )
)}
```

Then each letter can receive:

```css
transform:
  rotate(...)
  translateY(...);
```

This gives much more exaggerated playful typography.

---

# 33. SVG vs CSS vs Canvas

| Technique | Best For |
|---|---|
| CSS transforms | Simple decorative text |
| Individual spans | Hand-crafted typography |
| SVG textPath | True curved typography |
| Canvas | Advanced custom text effects |
| WebGL | Extreme animated effects |

For a website hero title:

**SVG is usually the best starting point.**

---

# 34. What I Recommend for Your Magazine

For a kids magazine landing page, I would build a reusable component with these properties:

```tsx
<ArcText
  text="DISCOVER!"
  arc={120}
  fontSize={120}
  letterSpacing={2}
  color="#FF4D6D"
  stroke="#FFFFFF"
  strokeWidth={14}
/>
```

Then add:

```text
               ★
          DISCOVER!
       ✦             ✦
```

with:

- SVG arc typography
- rounded display font
- thick white outline
- outer dark outline
- drop shadow
- stars/stickers
- slight rotation
- responsive SVG
- optional animation

---

# 35. A Useful Component API

A more advanced component could expose:

```tsx
<ArcText

  text="EXPLORE!"

  arc={100}

  fontSize={110}

  letterSpacing={3}

  fontWeight={800}

  color="#FF4D6D"

  stroke="#FFFFFF"

  strokeWidth={12}

  shadow

  rotate={0}

  responsive

/>
```

This turns the effect into a reusable design-system component.

---

# 36. Animation

Because SVG is part of the DOM, it can be animated.

For example, with CSS:

```css
.arc-text {

  animation:
    float 3s ease-in-out
    infinite;

}

@keyframes float {

  0% {
    transform:
      translateY(0)
      rotate(-1deg);
  }

  50% {
    transform:
      translateY(-8px)
      rotate(1deg);
  }

  100% {
    transform:
      translateY(0)
      rotate(-1deg);
  }

}
```

This can make the hero typography feel alive.

---

# 37. The Most Important Concept

You don't need a special "arc text" HTML tag.

You create:

```text
SVG
 │
 ├── PATH
 │
 └── TEXTPATH
       │
       └── YOUR WORD
```

The path defines the geometry:

```svg
<path
  id="arc"
  d="..."
/>
```

The text follows it:

```svg
<textPath
  href="#arc"
>
  YOUR WORD
</textPath>
```

That's the core idea.

---

# 38. Final Minimal Pattern

Whenever you need arc typography, remember this:

```html
<svg viewBox="0 0 1000 500">

  <defs>

    <path
      id="arc"
      d="
        M 80 350
        Q 500 50
          920 350
      "
    />

  </defs>

  <text
    text-anchor="middle"
  >

    <textPath
      href="#arc"
      startOffset="50%"
    >

      YOUR TEXT HERE

    </textPath>

  </text>

</svg>
```

Everything else is enhancement.

You can then add:

```css
font-size
font-family
font-weight
fill
stroke
stroke-width
letter-spacing
filter
```

and JavaScript/React can control the path dynamically.

---

# 39. Recommended Architecture for a Next.js Project

For your web project, I would keep the component separate:

```text
components/
│
└── typography/
    │
    └── arc-text.tsx
```

Then:

```tsx
import { ArcText }
  from "@/components/typography/arc-text";
```

Use it anywhere:

```tsx
<ArcText
  text="WELCOME!"
  arc={120}
  fontSize={100}
/>
```

This is much cleaner than copying SVG code into every page.

---

# 40. Summary

The simplest mental model is:

```text
             YOUR TEXT

                 ↓

        follows this path

      ╭────────────────╮
    ╭                    ╮
  ╭                        ╮
```

In HTML:

```html
<svg>
```

In SVG:

```html
<path>
```

The curved geometry lives in:

```html
d="M ... Q ... ..."
```

And the text follows it using:

```html
<textPath>
```

For a production web design, this gives you a scalable and responsive way to create playful curved typography without turning the text into an image.

**For your kids magazine hero section, the recommended stack is:**

```text
Next.js
   ↓
React
   ↓
Reusable ArcText component
   ↓
SVG <path>
   ↓
SVG <textPath>
   ↓
Playful display font
   ↓
Stroke + shadow + decorative elements
```

That gives you the closest practical web equivalent to Photoshop-style arc typography while keeping the text editable and responsive.