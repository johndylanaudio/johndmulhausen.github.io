---
title: "Behind the Tech with John Carmack: 5k Immersive Video"
author: John Carmack
---

*Today, video decoders are constrained by a number of limitations, including display resolution, FOV, and compression. In an effort to bring full 360 degree, 60 fps stereo to immersive video, Oculus CTO John Carmack has implemented a new technique for video encoding that can unlock a greater level of quality and visual clarity from existing high quality 360 captures. The following post from John provides more information on this technology and the making of its sample video: a 5k re-release of the award-winning* **Henry*, from Oculus Story Studio for* *[Oculus Go](https://www.oculus.com/experiences/go/2084588764916379/)* *and* *[Gear VR](https://www.oculus.com/experiences/gear-vr/2084588764916379/).*
*Developers interested in testing this experimental tool and source player with their existing 360 content can visit the Oculus Developer Center to* *[download the SDK sample.](https://developer.oculus.com/downloads/package/vr5kplayer/)*

* * *
*6/20/2018 Update:* *[The VR 5k Player download](https://developer.oculus.com/downloads/package/vr5kplayer/)* *now includes an update to the development code for videostrip.exe and source.*
* * *

## Video Limits

Playing traditional “flat” video in VR is generally limited by the resolution of the display — a 1280x720 video is already slightly beyond the resolution of the display, at least at the edges, unless you have an enormous curved virtual screen. We need higher resolution screens to get any advantage from 1080 HD content.

Immersive video is another matter. To play a 360 degree, 60 frames per second, stereo video, you need much more resolution than the video decoders can currently provide.

There isn’t a precise number for the angular resolution of the displays because the viewing optics make it non-uniform, but 5120 pixels across 360 degrees is a good approximation. Anyone over this on current VR headsets is simply wasting resources and inviting aliasing.
The most common representation for immersive videos is the “equirectangular” or “equirect” projection, where a sphere is mapped onto a rectangle twice as wide as it is high. This is an inefficient use of pixels at the poles, and other projections like barrels or inflated cubes can provide some savings, but they are in the tens of percents, not integral factors.

For stereo, you want this for each eye, so the total desired video is 5120 x 5120 at 60 fps, or 1500 M pixels per second.
When Gear VR debuted on the Note 4, you could decode 3840x2160 video at 30 fps, or 240 Mpps. If you stretched that around a full 360 the resolution looked decent, but motion wasn’t smooth, and it didn’t have any depth. If you wanted 60 fps and stereo, you got one quarter the resolution, which was objectionably blurry.

With the Galaxy S7 generation, video decoders doubled in performance to 4k60, or 480 Mpps, which is where we still are on Oculus Go and the latest Samsung phones. This is still only 1/3 of what we would like~~.~~
If you are willing to sacrifice on any one of the axes — be 180 degrees instead of 360, be 30 fps instead of 60 fps, or be mono instead of stereo, then you are only off by 50%, which really isn’t too bad. If you sacrifice on two axes, you can achieve the peak display quality with margin to spare — 180 degree, 30 fps stereo video is the most straightforward way to do that. Most cameras and workflows will still not be delivering optimal quality pixels, but it is possible with care, or with computer-generated imagery.

If you want to achieve full stereo, you need to somehow only decode the parts of the video that are important to the current view.

## View-Dependent Videos

Today’s VR headsets have roughly a 90-degree field of view, so your view is only about one-sixth if the entire sphere. if you were at the center of a cube, looking exactly at the middle of a face, the other five faces would not be visible at all.
Our video decoder can decode 1/3 of the world, and we only actually need 1/6 of it, so that should be plenty of margin to work with, but there are still a lot of challenges.

Because of the way video compression works, you can’t just decode arbitrary little pieces of it. Sequences of video are broken up into “groups of pictures” or “gops”, and you can only start decoding at those boundaries, where the complete picture, or “key frame,” is present. The remaining frames are predicted from earlier frames, which lets them be much, much smaller. Most video-on-demand systems use gops of three to five seconds to get a good compression ratio. With one second gops, the key frames will take up about 25% of the file size. With half second gops, basically, half the file is key frames.

Because you can’t instantly change what you are decoding, you need to have some lower fidelity encoding of the entire 360-degree view always available, because you can easily flip your head 90 degrees to the side in a couple hundred milliseconds.
Our earliest view dependent approach was to make twenty separate versions of the video, each one focusing on the detail in a different place. Initially a “pyramid projection” was used, then it migrated to an “offset cube map”. All these versions were stored on the servers, and the VR client switched between them as you looked around.

The gops were one second, but the additional overhead of going through the internet to traditional web servers made the switching delay even longer, and pretty much everyone noticed it — you would look to the side and everything would be blurry for sometimes two seconds or more before getting sharp.

Building 20 different versions of each video was problematic, and it was impractical to have them all on a device so that you could play locally instead of streaming from a server.
Something that was also not appreciated was that any resampling inevitably degrades the image quality. If you get a master video delivered as an equirect, turning it into a cube map lowered the quality even if it theoretically had the exact same pixel density.

## The New Scheme

*Left: 5k x 5k Master, Top Right: 2k x 2k Base, Bottom Right: 10 x 2k x 512 Strips*

The key compromise in the current scheme is to accept lower resolution at the top and bottom of the sphere. I justify this in several ways:

* Most people don’t look very far up or down when watching 360 video. Of course, you can follow this a little farther and say they don’t look left and right all that much either, and you wind up with the strong argument for 180 video, but 360 is still an incremental value.
* The down direction is often blacked out to hide the camera rig.
* For 3D 360 videos, directors are strongly urged to keep people from looking up or down, because the stereo 3D effect has to be ramped down before you can see the poles and have your eyes try to go backward.
* The uneven equirect projection at the poles can still give you some “extra” resolution, at least in one axis, so the bug becomes sort of a feature.

Still, it is a compromise, and some videos won’t work well in this format. An obvious example would be putting crisp text on the ceiling or floor. In exchange, we get a situation where view dependency in just the yaw angle is sufficient, which allows a system with minimal data duplication, so it can work on local devices instead of just massive servers.

As a base layer, the entire 5k master is resampled to a 2k x 2k version that is always available, so even if you spin around 180 degrees in a split second, there will always be something sensible to see. If you look at the ceiling or floor, this version is all that you will see.
The key center regions are cropped directly out of the 5k x 5k master, pixel for pixel with no resampling. These are split into ten independent video files, a 512 x 1024 pixel column from each eye, stacked and transposed to make 2048 x 512 video strips.
The total file size is roughly what a traditional 5k x 5k encoding would be because skipping the poles balances out the extra gop keyframes and extra low detail copy of the middle.

The playback engine simultaneously decodes four video streams – the background and the three strips centered in your current view. As you look around, the three strips switch sources at each gop transition point.

We know users don’t like to download huge apps, so there is a strong tension between quality and size. Henry is encoded with H264 at a CRF 22 quality level with half-second gops. If I were making an encoding to be preloaded onto a headset for a film festival or location-based platform where I didn’t care about download size, I would use CRF 18 and possibly quarter second gops.

The current implementation is codec-agnostic, and each of the eleven videos are completely independent. You can use h264, h265, VP9, or probably even MPEG-2 if you felt like it (the current tool only supports h264 and h265). Ideally, I would be decoding four strips at a time instead of three, but there is a painful amount of system software overhead with the video decoders, so this is all I feel comfortable with right now.
That leads to the reason the videos are transposed sideways. My as-yet unrealized crafty plan is to do enough bitstream hacking to paste the samples for all the strips together as h264/h265 “slices” in a larger frame, so the video decoder is decoding just one larger video instead of three or four smaller ones. This would be a drastic reduction in overhead, and the strips could then be narrower if desired since I could paste ten+ slices together pretty easily. I haven’t gotten it to work yet, though...

Henry works out quite well as a demo for this technology, with almost all of the action staying in the high detail band. It still doesn’t represent the absolute quality limit, though – Henry was built within the limitations of real-time rendering a few years ago, and while the capture for 360 video was done at a non-real-time pace, a similar short designed for and rendered with state of the art offline tools could be higher quality (but matching the charm will be tough!).

*Note: While many multi-camera rigs for capturing live footage may be able to spit out very high-resolution masters, the multiple levels of processing between the sensor and the stitched stereo master may mean that they don’t really produce much value over 4k.*
The “Wow, not blurry!” first impression is the most obvious effect of the new technology, but there are some other subtle things going on that contribute to the presentation.

To get the resolution to all the right places on the screen, the video pieces are put on VrApi layers, rather than drawn to conventional eye buffers. No matter what resolution you would use, the extra filtering step through eye buffers always has a cost in quality.
Directly texture mapping a video in VR gives you linear filtering, not the sRGB filtering you want. With a low-resolution video it doesn’t matter much, but when you have high resolution and high contrast elements like credits text, it makes a big difference – the text shimmers at the edges instead of feeling really solid. Since I have to copy the strips to assemble them into a contiguous range, I take the opportunity to use an sRGB texture as well.

Almost all video players let the video frame rate vary to match the time sync on the audio, which results in stutters in the video playback that are especially noticeable at 60 fps. Here, I insist on releasing exactly one video frame for each display frame, and I subtly resample the audio to stay in sync. Henry isn’t the most dramatic demonstration of this, but anything with continuous movement benefits from it.

The Audio 360 spatialized audio is done on-demand in the low latency audio fast path, so it responds much faster than the default implementation, giving no perceptible lag to the audio positioning.

I am very excited at the prospect of unlocking quality that has laid dormant in so many high-end 360 productions made over the last several years that have only been seen at terribly degraded quality – dust off those old studio masters!
