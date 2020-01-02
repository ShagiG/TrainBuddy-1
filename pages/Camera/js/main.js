var takeSnapshotUI = createClickFeedbackUI();

var video;
var takePhotoButton;
var toggleFullScreenButton;
var switchCameraButton;
var amountOfCameras = 0;
var currentFacingMode = "environment";

document.addEventListener("DOMContentLoaded", function(event) {
  DetectRTC.load(function() {
    if (DetectRTC.isWebRTCSupported == false) {
      alert(
        "Please use Chrome, Firefox, iOS 11, Android 5 or higher, Safari 11 or higher"
      );
    } else {
      if (DetectRTC.hasWebcam == false) {
        alert("Please install an external webcam device.");
      } else {
        amountOfCameras = DetectRTC.videoInputDevices.length;

        initCameraUI();
        initCameraStream();
      }
    }

    console.log(
      "RTC Debug info: " +
        "\n OS:                   " +
        DetectRTC.osName +
        " " +
        DetectRTC.osVersion +
        "\n browser:              " +
        DetectRTC.browser.fullVersion +
        " " +
        DetectRTC.browser.name +
        "\n is Mobile Device:     " +
        DetectRTC.isMobileDevice +
        "\n has webcam:           " +
        DetectRTC.hasWebcam +
        "\n has permission:       " +
        DetectRTC.isWebsiteHasWebcamPermission +
        "\n getUserMedia Support: " +
        DetectRTC.isGetUserMediaSupported +
        "\n isWebRTC Supported:   " +
        DetectRTC.isWebRTCSupported +
        "\n WebAudio Supported:   " +
        DetectRTC.isAudioContextSupported +
        "\n is Mobile Device:     " +
        DetectRTC.isMobileDevice
    );
  });
});

function initCameraUI() {
  video = document.getElementById("video");

  takePhotoButton = document.getElementById("takePhotoButton");
  toggleFullScreenButton = document.getElementById("toggleFullScreenButton");
  switchCameraButton = document.getElementById("switchCameraButton");

  takePhotoButton.addEventListener("click", function() {
    takeSnapshotUI();
    takeSnapshot();
    window.location.href = `/pages/PostPicture/index.html`;
  });

  // -- fullscreen part
  function fullScreenChange() {
    if (screenfull.isFullscreen) {
      toggleFullScreenButton.setAttribute("aria-pressed", true);
    } else {
      toggleFullScreenButton.setAttribute("aria-pressed", false);
    }
  }

  if (screenfull.isEnabled) {
    screenfull.on("change", fullScreenChange);

    toggleFullScreenButton.style.display = "block";

    // set init values
    fullScreenChange();

    toggleFullScreenButton.addEventListener("click", function() {
      screenfull.toggle(document.getElementById("container")).then(function() {
        console.log(
          "Fullscreen mode: " +
            (screenfull.isFullscreen ? "enabled" : "disabled")
        );
      });
    });
  } else {
    console.log("iOS doesn't support fullscreen (yet)");
  }

  // -- switch camera part
  if (amountOfCameras > 1) {
    switchCameraButton.style.display = "block";

    switchCameraButton.addEventListener("click", function() {
      if (currentFacingMode === "environment") currentFacingMode = "user";
      else currentFacingMode = "environment";

      initCameraStream();
    });
  }

  window.addEventListener(
    "orientationchange",
    function() {
      if (screen.orientation) angle = screen.orientation.angle;
      else angle = window.orientation;

      var guiControls = document.getElementById("gui_controls").classList;
      var vidContainer = document.getElementById("vid_container").classList;

      if (angle == 270 || angle == -90) {
        guiControls.add("left");
        vidContainer.add("left");
      } else {
        if (guiControls.contains("left")) guiControls.remove("left");
        if (vidContainer.contains("left")) vidContainer.remove("left");
      }
    },
    false
  );
}

function initCameraStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }

  var size = 1280;
  var constraints = {
    audio: false,
    video: {
      width: { ideal: size },
      height: { ideal: size },
      facingMode: { exact: currentFacingMode }
    }
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess)
    .catch(handleError);

  function handleSuccess(stream) {
    window.stream = stream; // make stream available to browser console
    video.srcObject = stream;

    if (constraints.video.facingMode) {
      if (constraints.video.facingMode === "environment") {
        switchCameraButton.setAttribute("aria-pressed", true);
      } else {
        switchCameraButton.setAttribute("aria-pressed", false);
      }
    }

    const track = window.stream.getVideoTracks()[0];
    const settings = track.getSettings();
    str = JSON.stringify(settings, null, 4);
  }

  function handleError(error) {
    if (error === "PermissionDeniedError") {
      alert("Permission denied. Please refresh and give permission.");
    }
  }
}

function takeSnapshot() {
  var canvas = document.createElement("canvas");

  var width = video.videoWidth;
  var height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, width, height);

  let image = btoa(canvas.toDataURL("image/png"));
  sessionStorage.setItem("image", image);

  // function getCanvasBlob(canvas) {
  //   return new Promise(function(resolve, reject) {
  //     canvas.toBlob(function(blob) {
  //       resolve(blob);
  //     }, "image/jpeg");
  //   });
  // }

  // some API's (like Azure Custom Vision) need a blob with image data
  // getCanvasBlob(canvas).then(function(blob) {
  //   // do something with the image blob
  //   var image = canvas.toDataURL("image/png");
  //   window.localStorage.setItem("image", btoa(image));
  //   // window.location.href = `/pages/PostPicture/index.html`;
  // });
}

function createClickFeedbackUI() {
  var overlay = document.getElementById("video_overlay"); //.style.display;
  // sound feedback
  var sndClick = new Howl({ src: ["snd/click.mp3"] });

  var overlayVisibility = false;
  var timeOut = 80;

  function setFalseAgain() {
    overlayVisibility = false;
    overlay.style.display = "none";
  }

  return function() {
    if (overlayVisibility == false) {
      sndClick.play();
      overlayVisibility = true;
      overlay.style.display = "block";
      setTimeout(setFalseAgain, timeOut);
    }
  };
}
