import { LazyVideo } from "./components/LazyVideo";


async function getVideoData() {
  const BASE_URL = "https://unimig.directus.app/assets";

  const res = await fetch(
    `https://unimig.directus.app/files?limit=100&filter[type][_eq]=video/mp4&sort=-created_on`,
    { next: { revalidate: 60 } }
  );

  const data = await res.json();


  const videoData = data.data.map((item) => {
    const fileUrl = `${BASE_URL}/${item.id}.mp4`;

    console.log(fileUrl);

    return {
      mp4: fileUrl,
      poster: "", // you can set poster here if needed
    };
  });

  return videoData;
}


export default async function Home() {
  const videoData = await getVideoData();

  return (
    <div style={{ padding: "24px", maxWidth: "960px", margin: "auto" }}>
      <video
        playsInline
        muted
        loop
        autoPlay
        controls
        preload="auto"
        // poster={"/placeholder.jpg"}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      >
        <source src={"https://unimig.directus.app/assets/e44d3819-5009-48fa-aa99-bd6c4521c193.mp4"} type="video/mp4" />
      </video>

      <h1>Autoplay + Muted Section</h1>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "16px",
          paddingBottom: "12px",
        }}
      > {videoData.slice(0, 25).map((vid, index) => (
        <div className="video-tile">
          <LazyVideo
            key={`auto-${index}`}
            mp4Src={vid.mp4}
            autoplay={true}
            loop={true}
            tapToPlay={false}
          />
        </div>
      ))}
      </div>

      <h1>Tap to Play Section</h1>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "16px",
          paddingBottom: "12px",
        }}
      >  {videoData.slice(25, 50).map((vid, index) => (
        <div className="video-tile"> <LazyVideo
          key={`tap-${index}`}
          mp4Src={vid.mp4}
          webmSrc={vid.webm}
          poster={vid.poster}
          autoplay={false}
          loop={false}
          tapToPlay={true}
        />
        </div>
      ))}
      </div>

      <h1>Looping Videos Section</h1>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "16px",
          paddingBottom: "12px",
        }}
      > {videoData.slice(50, 75).map((vid, index) => (
        <div className="video-tile">   <LazyVideo
          key={`loop-${index}`}
          mp4Src={vid.mp4}
          webmSrc={vid.webm}
          poster={vid.poster}
          autoplay={true}
          loop={true}
          tapToPlay={false}
        />
        </div>
      ))}
      </div>

      <h1>Manual Play Section</h1>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "16px",
          paddingBottom: "12px",
        }}
      >  {videoData.slice(75, 100).map((vid, index) => (
        <div className="video-tile">  <LazyVideo
          key={`manual-${index}`}
          mp4Src={vid.mp4}
          webmSrc={vid.webm}
          poster={vid.poster}
          autoplay={false}
          loop={false}
          tapToPlay={false}
        />
        </div>
      ))}
      </div>
    </div>
  );
}
