<template>
    <div class="camera-modal">
        <video ref="video"
               class="camera-stream" />
        <div class="camera-modal-container">
            <span @click="capture"
                  class="take-picture-button take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                <i class="material-icons">camera</i>
            </span>
        </div>
    </div>
</template>

<script>
import firebaseService from "@/services/firebase";
import postCat from "@/mixins/postCat";

export default {
  data() {
    return {
      mediaStream: null
    };
  },
  mixins: [postCat],
  mounted() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(mediaStream => {
        this.mediaStream = mediaStream;
        this.$refs.video.srcObject = mediaStream;
        this.$refs.video.play();
      })
      .catch(error => console.error("getUserMedia() error:", error));
  },
  methods: {
    capture() {
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(mediaStreamTrack);
      const imageName = `picture-${new Date().getTime()}`;
      return imageCapture.takePhoto().then(blob => {
        firebaseService.storage
          .ref()
          .child(`images/${imageName}`)
          .put(blob)
          .then(
            () =>
              firebaseService.storage
                .ref("images")
                .child(imageName)
                .getDownloadURL()
            // https://firebasestorage.googleapis.com/v0/b/cropchat-95fa2.appspot.com/o/images%2Fpicture-1534942093646?alt=media&token=a2296216-7e5a-4525-aa2d-3512d4e0edef
            // https://firebasestorage.googleapis.com/v0/b/cropchat-95fa2.appspot.com/o/images/picture-1534942093646?alt=media&token=a2296216-7e5a-4525-aa2d-3512d4e0edef
          )
          .then(url => this.postCat(url, "Hello"))
          .then(this.$router.push("/"));
      });
    }
  },
  destroyed() {
    const tracks = this.mediaStream.getTracks();
    tracks.map(track => track.stop());
  }
};
</script>

<style scoped>
.camera-modal {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: white;
  z-index: 10;
}
.camera-stream {
  width: 100%;
  max-height: 100%;
}
.camera-modal-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
}
.take-picture-button {
  display: flex;
}
</style>
