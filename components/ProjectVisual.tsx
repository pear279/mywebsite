import { Project, asset } from "@/data/projects";
export function ProjectVisual({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div className={`project-visual ${project.color} ${large ? "large" : ""}`}>
      {project.slug === "koala-pet" ? (
        <>
          <span className="visual-note">A LITTLE COMPANY.</span>
          <img
            className="koala-visual"
            src={asset("/media/koala-greet.webp")}
            alt="挥手的考拉桌宠"
          />
          <span className="pet-status">
            <i /> task completed. time for a hug.
          </span>
        </>
      ) : project.slug === "soundlens" ? (
        <>
          <div className="sound-top">
            <span>音象 / SOUNDLENS</span>
            <span>声音感知 / 信号示意</span>
          </div>
          <div className="waveform" aria-hidden="true">
            {Array.from({ length: 43 }, (_, i) => (
              <i
                key={i}
                style={{
                  height: `${18 + Math.abs(Math.sin(i * 0.65) * Math.cos(i * 0.18)) * 130}px`,
                  animationDelay: `${i * -0.07}s`,
                }}
              />
            ))}
          </div>
          <div className="sound-bottom">
            <span>把声音，转成可见的变化。</span>
            <span className="signal">● LIVE SIGNAL STUDY</span>
          </div>
        </>
      ) : (
        <>
          <span className="visual-note">
            {project.slug === "china-stroll"
              ? "BEIJING, WITH CONFIDENCE."
              : "ONE NOTE. A LITTLE GROWTH."}
          </span>
          <div className="phone-composition">
            {project.images.slice(0, 2).map((src, i) => (
              <img
                key={src}
                className={`phone phone-${i}`}
                src={asset(`/media/${src}.webp`)}
                alt={`${project.title} ${i ? "功能界面" : "首页界面"}`}
                loading="lazy"
              />
            ))}
          </div>
          <span className="visual-caption">PRODUCT / DESIGN / BUILD</span>
        </>
      )}
    </div>
  );
}
