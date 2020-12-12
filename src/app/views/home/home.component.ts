import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Rimando As Poesias';
  player_1:any = null;
  player_2:any = null;
  first_video:String = '_MR-HCQcEpg'
  second_video:String = 'rPcejt7GUtQ'
  current_1:String = this.first_video
  current_2:String = this.second_video
  statusRap = 0
  rap:any
  beat:any

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
        height: '100px',
        width: '100%',
        videoId: this.second_video,
        playerVars: {'autoplay': 1, 'rel': 0, 'controls': 0 },
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

  intervalRap = setInterval(() => {
    this.playRap()
  }, 1000)

  playRap() {
    if(this.statusRap === 2) {
      setInterval(() => {
        this.rap.target.playVideo()
      }, 15000)
      this.beat.target.playVideo()
      clearInterval(this.intervalRap)
    }
  }

  playVideoStatus1(event:any) {
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
