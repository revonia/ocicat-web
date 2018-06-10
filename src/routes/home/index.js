import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import mp4 from '../../assets/index.mp4';
import logo from '../../assets/logo.png';

// function Home() {
//   return (
//     <div>
//       <div className={styles.normal}>
//         <h1 className={styles.title}>奥西签到</h1>
//       </div>
//     </div>
//   );
// }

class Home extends React.Component {
  componentDidMount() {
    let body = document.getElementsByTagName('body')[0];
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }
  render() {
    return (
      <div>
        <video className={styles.video} autoPlay="autoplay" loop="loop" muted={true}>
          <source src={mp4} type="video/mp4" />
        </video>
        <div className={styles.videoMono} />
        <div className={styles.normal}>
          <img src={logo}/>
        </div>
      </div>
    )
  }
}


Home.propTypes = {
};

export default connect()(Home);
