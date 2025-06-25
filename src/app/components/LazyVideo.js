"use client";

import { useEffect, useRef, useState } from "react";

export function LazyVideo({ mp4Src, poster, autoplay, loop, tapToPlay }) {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [showVideo, setShowVideo] = useState(false);
    const [playing, setPlaying] = useState(autoplay);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShowVideo(true);
                        observer.disconnect();
                    }
                });
            },
            {
                root: null,
                rootMargin: "300px", // larger margin helps trigger sooner
                threshold: 0.01,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleClick = () => {
        if (tapToPlay && videoRef.current) {
            if (playing) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setPlaying(!playing);
        }
    };

    const fallbackPoster = poster && poster.length > 0 ? poster : "/placeholder.jpg";

    return (
        <div ref={containerRef} style={{ marginBottom: "24px" }} onClick={handleClick}>
            {showVideo ? (
                <video
                    ref={videoRef}
                    playsInline
                    muted
                    loop={loop}
                    autoPlay={autoplay}
                    preload="auto"
                    poster={fallbackPoster}
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                    controls
                >
                    <source src={mp4Src} type="video/mp4" />
                </video>
            ) : (
                <img
                    src={fallbackPoster}
                    alt="Video Poster"
                    style={{ width: "100%" }}
                />
            )}
        </div>
    );
}
