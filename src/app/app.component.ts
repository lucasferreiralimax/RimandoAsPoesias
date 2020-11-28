import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rimando As Poesias';
  player_1 = null;
  player_2 = null;
  first_video = '_MR-HCQcEpg'
  second_video = 'rPcejt7GUtQ'
  current_1:String = this.first_video
  current_2:String = this.second_video

  ngAfterViewInit() {
    const doc = (<any>window).document;
    let playerApiScript = doc.createElement('script');

    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }

  ngOnInit() {
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player_1 = new (<any>window).YT.Player('player_1', {
        height: '100%',
        width: '100%',
        videoId: this.first_video,
        playerVars: {'autoplay': 0, 'rel': 0, 'controls': 0 },
        events: {
          'onReady': (e:any) => {
            this.statusRap += 1
            this.rap = e
          },
          'onStateChange': (e:any) => {
            this.playVideoStatus1(e)
          }
        }
      })
      this.player_2 = new (<any>window).YT.Player('player_2', {
        height: '50%',
        width: '100%',
        videoId: this.second_video,
        playerVars: {'autoplay': 0, 'rel': 0, 'controls': 0 },
        events: {
          'onReady': (e:any) => {
            this.statusRap += 1
            this.beat = e
          },
          'onStateChange': (e:any) => {
            this.playVideoStatus2(e)
          }
        }
      })
    }
  }

  statusRap = 0
  rap:any
  beat:any

  intervalRap = setInterval(() => {
    this.playRap()
  }, 1000)

  playRap() {
    if(this.statusRap === 2) {
      console.log(`Play RAP`)
      setInterval(() => {
        console.log(`Play Rima`)
        this.rap.target.playVideo()
      }, 15000)
      console.log(`Play Beat`)
      this.beat.target.playVideo()

      clearInterval(this.intervalRap)
    } else {
      console.log("O rap ainda vai n carregou")
    }
  }

  playVideoStatus1(event:any) {
    console.log("Video 1")
    console.log(this.current_1)

    if (event.data == (<any>window).YT.PlayerState.ENDED) {
      let id = "scRG-OHH2wY"

      if(this.current_1 == id) {
        this.current_1 = this.first_video
        event.target.loadVideoById(this.first_video)
      } else {
        this.current_1 = id
        event.target.loadVideoById(id)
      }
    }
  }

  playVideoStatus2(event:any) {
    console.log("Video 2")
    console.log(this.current_2)

    if (event.data == (<any>window).YT.PlayerState.ENDED) {
      let id = "Y_9_0DZ_aXc"

      if(this.current_2 == id) {
        this.current_2 = this.second_video
        event.target.loadVideoById(this.second_video)
      } else {
        this.current_2 = id
        event.target.loadVideoById(id)
      }
    }
  }

}
