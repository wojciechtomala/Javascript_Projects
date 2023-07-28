function createPlayer(container, src) {
    const video = container.querySelector("video");
    const timeline = container.querySelector("[data-js-timeline]");
    const play = container.querySelector("[data-js-play]");
    const time = container.querySelector("[data-js-time]");
    const duration = container.querySelector("[data-js-duration]");
    const progress = container.querySelector("[data-js-progress]");

    function secondsToTime(seconds) {
        return [seconds / 3600, (seconds % 3600) / 60, (seconds % 3600) % 60]
            .map((v) => (v < 10 ? `0${parseInt(v, 10)}` : parseInt(v, 10)))
            .filter((i, j) => i !== "00" || j > 0)
            .join(":");
    }

    function togglePlay(e) {
        e.stopPropagation();

        if(video.paused) {
            video.play();
            play.classList.remove("fa-play");
            play.classList.add("fa-pause");
        } else {
            video.pause();
            play.classList.remove("fa-pause");
            play.classList.add("fa-play");
        }
    }

    function updateDuration(e) {
        duration.textContent = secondsToTime(e.currentTarget.duration);
    }

    function updateTime(e) {
        time.textContent = secondsToTime(e.currentTarget.currentTime);
    }

    function updateProgress(e) {
        progress.style.width = `${e.currentTarget.currentTime / e.currentTarget.duration * 100}%`;
    }

    function setTime(e) {
        const pos = e.currentTarget.getBoundingClientRect();
        const left = e.pageX - pos.left;
        const percentage = left / pos.width;

        video.currentTime = video.duration * percentage;
    }

    play.addEventListener("click", togglePlay);
    timeline.addEventListener("click", setTime);

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("durationchange", updateDuration);
    video.addEventListener("timeupdate", updateTime);

    video.setAttribute("src", src);
}

createPlayer(
    document.querySelector("[data-js-player]"),
    "###"
);
