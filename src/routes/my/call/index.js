import React from 'react';
import { connect } from 'dva';
import { Button, Col, Icon, Row } from "antd";
import styles from './index.css';
import SimpleClock from '../../../components/My/SimpleClock';
import CTM from '../../../components/My/CountdownTimerMaker';
import CallTheRollBox from '../../../components/My/CallTheRollBox';
import CenterBox from '../../../components/Box/CenterBox';
import { timestampToDatetime } from '../../../utils/helper';

const Timer = CTM(15 * 60 * 1000, 1000);

const rowAttr = {
  style:{paddingBottom: "8px"}, type:"flex", justify:"center",
};

function Main({ dispatch, course, start, startLoading, stopLoading, lesson_id, finish }, height, stopPlay) {

  const handleStart = function(id) {
    dispatch({
      type: 'callTheRoll/start',
      payload: {
        course_id: id
      }
    });
  };

  const handleStop = function() {
    stopPlay();
    dispatch({
      type: 'callTheRoll/stop',
      payload: {
        course_id: course.id,
        lesson_id: lesson_id
      }
    });
  };

  return (
    <div style={{height: height - 80 + 'px'}}>

      <CenterBox width={320} height={360}>
        <Row type="flex" justify="center"><span style={{fontSize: "48px"}}><Icon type="book"/></span></Row>
        <Row>
          <Row {...rowAttr}><span style={{fontSize: "20px"}}>{course.name}</span></Row>
          {/*<Row style={{ paddingBottom:"8px" }} type="flex" justify="center"><span style={{ textAlign: "center", fontSize: "14px"}}>开始时间：<SimpleClock render={(date) => timestampToDatetime(date / 1000)}/></span></Row>*/}
          <Row type="flex" justify="center"><span style={{fontSize: "14px"}}>&nbsp;</span></Row>
          <Row {...rowAttr}><span style={{fontSize: "18px"}}>签到剩余时间</span></Row>
          <Row {...rowAttr}><span style={{fontSize: "24px", fontWeight:"bold"}}><Timer pause={!start || finish} completeCallback={handleStop}/></span></Row>
          <Row type="flex" justify="center"><span style={{fontSize: "14px"}}>&nbsp;</span></Row>
          <Row {...rowAttr}>
            {!start ? <Button type="primary" size="large" onClick={() => handleStart(course.id)} icon="play-circle-o" loading={startLoading}>开始签到</Button>
              : <Button type="primary" size="large" onClick={handleStop} loading={stopLoading} icon="area-chart">结束签到并查看结果</Button>
            }</Row>
        </Row>

      </CenterBox>
    </div>
  );
}

class Index extends React.Component {
  componentDidMount() {
    // let body = document.getElementsByTagName('body')[0];
    // body.style.backgroundColor="cyan";
  }

  componentWillMount() {
    if (!this.props.course) {
      this.props.dispatch({
        type: 'app/jumpTo',
        payload: {
          pathname: '/my',
        },
      });
      return false;
    }
    // let body = document.getElementsByTagName('body')[0];
    // body.style.backgroundColor="cyan";
  }

  constructor(){
    super();
    this.startPlay = this.startPlay.bind(this);
    this.stopPlay = this.stopPlay.bind(this);
    let audio = new window.Audio();
    audio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    this.state = {
      audio: audio,
      play: false,
    };
  }

  startPlay(pin) {
    if (this.state.play || !pin) return;
    console.log(pin);
    this.state.audio.src = require(`../../../assets/music/${pin}.ogg`);
    this.state.audio.play();
    this.setState({
      play:true,
    });
  }

  stopPlay() {
    this.state.audio.pause();
    this.setState({
      play: false,
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.state.play !== true && newProps.start === true && newProps.pin) {
      this.startPlay(newProps.pin);
    }
  }

  componentWillUnmount() {
    this.stopPlay();
  }
  render() {
    return Main(this.props, document.body.clientHeight, this.stopPlay);
  }
}

function mapStateToProps(state) {
  return {
    course: state.callTheRoll.course,
    start: state.callTheRoll.start,
    pin: state.callTheRoll.pin,
    lesson_id: state.callTheRoll.lesson_id,
    finish: state.callTheRoll.finish,
    startLoading: state.loading.effects['callTheRoll/start'],
    stopLoading: state.loading.effects['callTheRoll/stop'],
  };
}

export default connect(mapStateToProps)(Index);
