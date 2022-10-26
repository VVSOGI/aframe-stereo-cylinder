# Aframe stereoscopic cylinder
The library plays processed images using stereoscopic in the aframe cylinder.

![no stereoscopic](https://user-images.githubusercontent.com/76682009/197962338-c3686356-1ecd-4b28-83cf-a0717914eb1c.png)

![yes stereoscopic](https://user-images.githubusercontent.com/76682009/197962473-895b48b6-c138-4965-b026-16f7c2fc54b3.png)

# how to use

```js
    <a-scene>
      <a-camera reverseMouseDrag position="0 0 0.2"></a-camera>
      <a-assets> // Put in the video you want.
        <video id="video" src="./maryoculus.mp4" autoplay loop></video>
      </a-assets>
      <a-cylinder // After making cylinder with aframe, put stereo-cylinder in attribute
        stereo-cylinder="deg: 150; scale:-1,1,1; eye: left"
        side="front"
        src="#video"
      />
    </a-scene>
```

```js
  schema: {
    eye: { default: 'left', oneOf: ['left', 'right'] },
    deg: { type: 'number', default: '180' },
    scale: { type: 'string', default: '-1,1,1' },
  },
  
  this is schema props.
  for example, if you write stereo-cylinder="deg: 120;" Then you're going to make a cylinder with an angle of 120 degrees.
  and use the various attributes of A-frame's cylinder
```
[A-frame's cylinder attributes](https://aframe.io/docs/1.3.0/primitives/a-cylinder.html#attributes)
